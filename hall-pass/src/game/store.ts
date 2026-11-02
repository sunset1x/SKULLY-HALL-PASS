import { create } from 'zustand'
import { ANNOUNCEMENTS, INITIAL_QUESTS, NPCS, PERIODS, RANDOM_EVENTS, WEATHER, ITEMS } from './data'
import type { LocationId, SaveData } from '../types/game'

const blankStats = { health: 82, energy: 76, stress: 18, popularity: 12, intelligence: 55, athleticism: 45, creativity: 48, money: 20, attendance: 100, gpa: 2.8 }
const initialSkills = { academics: 1, sports: 1, creativity: 1, charisma: 1, technology: 1 }

const makeInitial = (): SaveData => ({
  stats: { ...blankStats }, skills: { ...initialSkills },
  inventory: [{ id: 'notebook', name: 'Notebook', quantity: 1, icon: '📓' }, { id: 'backpack', name: 'Backpack', quantity: 1, icon: '🎒' }],
  year: 1, day: 1, periodIndex: 0, location: 'Main Hallway', attendanceDays: 0, detention: 0, reputation: 50,
  clubs: [], quests: INITIAL_QUESTS.map(q => ({ ...q })), achievements: ['first-day'], npcs: NPCS.map(n => ({ ...n })),
  weather: WEATHER[0], announcement: ANNOUNCEMENTS[0], moneyEarned: 20, classesAttended: 0, clubsJoined: 0, friendshipsMade: 0,
})

interface GameStore extends SaveData {
  screen: 'menu' | 'game' | 'pause'
  toast: string; event: string; lastAction: string; muted: boolean; volume: number
  newGame: () => void; start: () => void; backToMenu: () => void; pause: () => void; resume: () => void
  save: () => boolean; load: () => boolean; autoSave: () => void
  travel: (location: LocationId) => void; attend: (className: string) => void; skip: () => void
  advance: () => void; study: () => void; exercise: () => void; create: () => void; socialize: (npcId: string) => void
  rest: () => void; earn: (amount: number, reason: string) => void; joinClub: (club: string) => void
  completeQuest: (id: string) => void; addItem: (id: string) => void; spendEnergy: (amount: number) => void
  setMuted: (muted: boolean) => void; setVolume: (volume: number) => void; clearToast: () => void
}

const clamp = (value: number) => Math.max(0, Math.min(100, value))
const achievement = (state: SaveData, id: string) => state.achievements.includes(id) ? state.achievements : [...state.achievements, id]

export const useGameStore = create<GameStore>((set, get) => ({
  ...makeInitial(), screen: 'menu', toast: '', event: 'Welcome to Northbridge High', lastAction: '', muted: false, volume: 70,
  newGame: () => set({ ...makeInitial(), screen: 'game', toast: 'Freshman year begins!', lastAction: 'New game started' }),
  start: () => set({ screen: 'game' }), backToMenu: () => set({ screen: 'menu' }), pause: () => set({ screen: 'pause' }), resume: () => set({ screen: 'game' }),
  save: () => { const state = get(); const save: SaveData = (({ stats, skills, inventory, year, day, periodIndex, location, attendanceDays, detention, reputation, clubs, quests, achievements, npcs, weather, announcement, moneyEarned, classesAttended, clubsJoined, friendshipsMade }) => ({ stats, skills, inventory, year, day, periodIndex, location, attendanceDays, detention, reputation, clubs, quests, achievements, npcs, weather, announcement, moneyEarned, classesAttended, clubsJoined, friendshipsMade }))(state); localStorage.setItem('hall-pass-save', JSON.stringify(save)); set({ toast: 'Game saved locally' }); return true },
  load: () => { const raw = localStorage.getItem('hall-pass-save'); if (!raw) return false; try { set({ ...JSON.parse(raw), screen: 'game', toast: 'Save loaded' }); return true } catch { return false } },
  autoSave: () => get().save(), clearToast: () => set({ toast: '' }),
  travel: location => set(state => ({ location, lastAction: `Traveled to ${location}`, energy: undefined, stats: { ...state.stats, energy: clamp(state.stats.energy - 1) } })),
  attend: className => set(state => { const passed = Math.max(0, state.stats.gpa + state.stats.intelligence / 500 - 0.02); const nextAchievements = achievement({ ...state } as SaveData, passed >= 4 ? 'straight-a' : 'first-day'); return { stats: { ...state.stats, gpa: clamp(passed * 25) / 25, attendance: clamp(state.stats.attendance + 0.15), energy: clamp(state.stats.energy - 7), stress: clamp(state.stats.stress + 3) }, skills: { ...state.skills, academics: state.skills.academics + 0.08 }, classesAttended: state.classesAttended + 1, achievements: nextAchievements, lastAction: `Attended ${className}`, event: `${className} class complete` } }),
  skip: () => set(state => ({ stats: { ...state.stats, gpa: Math.max(0, state.stats.gpa - 0.12), attendance: clamp(state.stats.attendance - 2), stress: clamp(state.stats.stress - 2) }, detention: state.detention + 1, reputation: clamp(state.reputation - 3), lastAction: 'Skipped class', event: 'You received detention', toast: 'Skipping class cost you a detention.' })),
  advance: () => set(state => { const end = state.periodIndex === PERIODS.length - 1; const nextDay = end ? state.day + 1 : state.day; const randomEvent = Math.random() < 0.12 ? RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)] : state.event; const weather = WEATHER[Math.floor(Math.random() * WEATHER.length)]; let year = state.year; let achievements = state.achievements; if (nextDay > 180 && state.year < 4) { year += 1; achievements = achievement({ ...state, achievements } as SaveData, `year-${['', 'two', 'three', 'four'][year]}`) } return { periodIndex: end ? 0 : state.periodIndex + 1, day: nextDay, year, weather, event: randomEvent, announcement: ANNOUNCEMENTS[Math.floor(Math.random() * ANNOUNCEMENTS.length)], stats: { ...state.stats, stress: clamp(state.stats.stress + (end ? 3 : 1)) }, achievements } }),
  study: () => set(state => ({ stats: { ...state.stats, energy: clamp(state.stats.energy - 8), stress: clamp(state.stats.stress + 4), gpa: Math.min(4, state.stats.gpa + 0.07) }, skills: { ...state.skills, academics: state.skills.academics + 0.12 }, lastAction: 'Completed a study session', event: 'Homework progress improved' })),
  exercise: () => set(state => ({ stats: { ...state.stats, energy: clamp(state.stats.energy - 10), health: clamp(state.stats.health + 3), stress: clamp(state.stats.stress - 5) }, skills: { ...state.skills, sports: state.skills.sports + 0.15 }, lastAction: 'Finished practice', event: 'Athletic skill increased' })),
  create: () => set(state => ({ stats: { ...state.stats, energy: clamp(state.stats.energy - 5), creativity: clamp(state.stats.creativity + 2), stress: clamp(state.stats.stress - 3) }, skills: { ...state.skills, creativity: state.skills.creativity + 0.18 }, lastAction: 'Made something creative', event: 'Creativity increased' })),
  socialize: npcId => set(state => { const npcs = state.npcs.map(n => n.id === npcId ? { ...n, friendship: clamp(n.friendship + 12) } : n); const friends = npcs.filter(n => n.friendship >= 100).length; return { npcs, stats: { ...state.stats, popularity: clamp(state.stats.popularity + 3), stress: clamp(state.stats.stress - 4) }, skills: { ...state.skills, charisma: state.skills.charisma + 0.12 }, achievements: friends >= 1 ? achievement(state, 'social-butterfly') : state.achievements, lastAction: 'Talked with a classmate', event: 'A friendship grew stronger' } }),
  rest: () => set(state => ({ stats: { ...state.stats, energy: clamp(state.stats.energy + 18), health: clamp(state.stats.health + 5), stress: clamp(state.stats.stress - 7) }, lastAction: 'Rested', event: 'Energy restored' })),
  earn: (amount, reason) => set(state => ({ stats: { ...state.stats, money: state.stats.money + amount }, moneyEarned: state.moneyEarned + amount, lastAction: reason, toast: `Earned $${amount}` })),
  joinClub: club => set(state => state.clubs.includes(club) ? state : ({ clubs: [...state.clubs, club], clubsJoined: state.clubsJoined + 1, reputation: clamp(state.reputation + 4), lastAction: `Joined ${club}`, toast: `Welcome to ${club}!`, achievements: achievement(state, 'club-hopper') })),
  completeQuest: id => set(state => ({ stats: { ...state.stats, money: state.stats.money + (state.quests.find(q => q.id === id)?.reward ?? 0) }, quests: state.quests.map(q => q.id === id ? { ...q, progress: q.goal, completed: true } : q), lastAction: 'Quest completed', toast: 'Quest reward collected!', moneyEarned: state.moneyEarned + (state.quests.find(q => q.id === id)?.reward ?? 0) })),
  addItem: id => set(state => { const item = ITEMS.find(i => i[0] === id); if (!item) return state; const existing = state.inventory.find(i => i.id === id); return { inventory: existing ? state.inventory.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i) : [...state.inventory, { id, name: item[1], quantity: 1, icon: item[2] }], lastAction: `Found ${item[1]}`, toast: `${item[1]} added to inventory` } }),
  spendEnergy: amount => set(state => ({ stats: { ...state.stats, energy: clamp(state.stats.energy - amount) } })),
  setMuted: muted => set({ muted }), setVolume: volume => set({ volume }),
}))
