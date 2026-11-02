import { useEffect, useState } from 'react'
import { ACHIEVEMENTS, CLASSES, CLUBS, LOCATIONS, PERIODS, TEACHERS } from './game/data'
import { useGameStore } from './game/store'
import { PhaserCampus } from './game/ui/PhaserCampus'
import './App.css'
import './index.css'

const statLabels = [['health','Health'],['energy','Energy'],['stress','Stress'],['popularity','Popularity'],['intelligence','Intelligence'],['athleticism','Athleticism'],['creativity','Creativity'],['attendance','Attendance'],['gpa','GPA']] as const
const tabs = ['Map','Quests','Social','Inventory','Clubs'] as const

type Tab = typeof tabs[number]

function App() {
  const game = useGameStore()
  const [tab, setTab] = useState<Tab>('Map')
  const [view, setView] = useState<'main'|'achievements'|'settings'|'credits'>('main')
  const [toastShown, setToastShown] = useState(false)
  useEffect(() => { if (!game.toast) return; setToastShown(true); const timer = setTimeout(() => { setToastShown(false); game.clearToast() }, 2400); return () => clearTimeout(timer) }, [game.toast, game.clearToast])

  if (game.screen === 'menu') return (
    <main className="menu-screen">
      <div className="brand-mark"><span>SH</span></div>
      <section className="menu-panel">
        <p className="eyebrow">NORTHBRIDGE HIGH SCHOOL</p>
        <h1>HALL PASS</h1>
        <p className="tagline">Four years. Every choice counts.</p>
        {view === 'main' ? <nav className="menu-actions">
          <button className="primary" onClick={game.newGame}>Play</button>
          <button onClick={game.load}>Load Game</button>
          <button onClick={() => setView('achievements')}>Achievements</button>
          <button onClick={() => setView('settings')}>Settings</button>
          <button onClick={() => setView('credits')}>Credits</button>
        </nav> : <section className="sub-view">
          <button className="back" onClick={() => setView('main')}>← Back</button>
          {view === 'achievements' && <><h2>Achievements</h2><div className="achievement-grid">{ACHIEVEMENTS.map(a => { const unlocked = game.achievements.includes(a.id); return <article className={unlocked ? 'unlocked' : ''} key={a.id}><span>{unlocked ? a.icon : '🔒'}</span><div><strong>{a.title}</strong><small>{a.description}</small></div></article> })}</div></>}
          {view === 'settings' && <><h2>Settings</h2><label className="toggle-row">Sound <input type="checkbox" checked={!game.muted} onChange={e => game.setMuted(!e.target.checked)} /></label><label>Volume <input type="range" min="0" max="100" value={game.volume} onChange={e => game.setVolume(Number(e.target.value))} /></label></>}
          {view === 'credits' && <><h2>Credits</h2><p>SKULLY: HALL PASS</p><p>Designed as a complete browser life simulator.</p><p>Built with React, Phaser 3, and Zustand.</p></>}
        </section>}
      </section>
      <div className="menu-art"><div className="student student-one"><i />S</div><div className="school-building"><b>NORTHBRIDGE</b></div><div className="student student-two"><i />K</div></div>
    </main>
  )

  const period = PERIODS[game.periodIndex]
  const yearNames = ['Freshman','Sophomore','Junior','Senior']
  if (game.year > 4) return <main className="ending"><div><p>Northbridge High School</p><h1>Class of 2027</h1><h2>{game.stats.gpa >= 3.5 ? 'A Life in the Making' : game.stats.popularity >= 75 ? 'Campus Legend' : 'Your Next Chapter'}</h2><p>You finished with a {game.stats.gpa.toFixed(2)} GPA, ${game.stats.money}, and {game.reputation} reputation.</p><button className="primary" onClick={game.backToMenu}>Return to Menu</button></div></main>

  return <main className="game-shell">
    <header className="topbar">
      <div className="school-crest"><span>NH</span><div><strong>NORTHBRIDGE</strong><small>EST. 1964</small></div></div>
      <div className="schedule"><span>DAY {game.day}</span><strong>{period}</strong><span>{yearNames[game.year - 1]} Year</span></div>
      <div className="weather"><span>{game.weather === 'Rainy' ? '☂' : game.weather === 'Cold' ? '❄' : '☀'}</span><div>{game.weather}<small>{game.location}</small></div></div>
      <button className="icon-button" aria-label="Pause" onClick={game.pause}>Ⅱ</button>
    </header>

    <section className="announcement"><span>DAILY ANNOUNCEMENT</span><div>{game.announcement}</div><b>{game.event}</b></section>

    <div className="game-layout">
      <aside className="stats-panel">
        <div className="avatar"><div className="avatar-face">S</div><small>LEVEL {Math.floor(game.skills.academics)}</small></div>
        <div className="stat-money"><span>Cash</span><strong>${game.stats.money}</strong></div>
        <div className="stats-list">{statLabels.map(([key,label]) => <div className="stat" key={key}><div><span>{label}</span><b>{key === 'gpa' ? game.stats.gpa.toFixed(2) : `${Math.round(game.stats[key])}${key === 'attendance' ? '%' : ''}`}</b></div><meter min="0" max={key === 'gpa' ? 4 : 100} value={game.stats[key]} /></div>)}</div>
        <div className="reputation"><span>Reputation</span><div><i style={{width: `${game.reputation}%`}} /></div><b>{game.reputation}</b></div>
      </aside>

      <section className="world-panel">
        <div className="location-head"><div><p>CAMPUS</p><h2>{game.location}</h2></div><button onClick={() => game.travel('Courtyard')}>Explore Courtyard →</button></div>
        <div className="campus-map">
          <PhaserCampus />
          {LOCATIONS.map((location, i) => <button key={location} className={`room room-${i} ${location === game.location ? 'active' : ''}`} onClick={() => game.travel(location)}><span>{['▦','⌂','◉','□','▤','?','★','⌨','☘'][i]}</span>{location}</button>)}
          <div className="map-player">S</div>
        </div>
        <div className="action-dock">
          <button onClick={() => game.attend(CLASSES[(game.day + game.periodIndex) % CLASSES.length])}><span>📚</span><div><b>Attend Class</b><small>-7 energy</small></div></button>
          <button onClick={game.skip}><span>↗</span><div><b>Skip Class</b><small>risk detention</small></div></button>
          <button onClick={game.study}><span>✎</span><div><b>Study</b><small>+ academics</small></div></button>
          <button onClick={game.rest}><span>☾</span><div><b>Rest</b><small>+ energy</small></div></button>
          <button onClick={game.exercise}><span>◆</span><div><b>Practice</b><small>+ sports</small></div></button>
          <button onClick={game.create}><span>✦</span><div><b>Create</b><small>+ creativity</small></div></button>
        </div>
      </section>

      <aside className="right-panel">
        <nav>{tabs.map(item => <button className={tab === item ? 'active' : ''} key={item} onClick={() => setTab(item)}>{item}</button>)}</nav>
        <div className="panel-content">
          {tab === 'Map' && <><h3>Current Objective</h3><article className="objective"><span>1</span><div><b>Make an impression</b><p>Attend classes and meet a classmate.</p></div></article><h3>Teacher Today</h3><article className="teacher"><div>{TEACHERS[(game.day + game.periodIndex) % TEACHERS.length].name[0]}</div><span><b>{TEACHERS[(game.day + game.periodIndex) % TEACHERS.length].name}</b><small>{TEACHERS[(game.day + game.periodIndex) % TEACHERS.length].subject}</small></span></article><h3>Skills</h3>{Object.entries(game.skills).map(([name,value]) => <div className="skill" key={name}><span>{name}</span><meter min="0" max="5" value={value} /><b>Lv {Math.floor(value)}</b></div>)}</>}
          {tab === 'Quests' && <><h3>Quest Log</h3>{game.quests.map(q => <article className="quest" key={q.id}><div><b>{q.title}</b><small>{q.description}</small><meter min="0" max={q.goal} value={q.progress} /></div><span>${q.reward}</span>{q.completed ? <em>Complete</em> : <button onClick={() => game.completeQuest(q.id)}>Finish</button>}</article>)}</>}
          {tab === 'Social' && <><h3>Classmates</h3>{game.npcs.map(n => <article className="npc" key={n.id}><div className="npc-avatar">{n.name[0]}</div><span><b>{n.name}</b><small>{n.friendship >= 100 ? 'Best Friend' : n.friendship >= 50 ? 'Friend' : n.friendship >= 12 ? 'Acquaintance' : 'Stranger'}</small></span><meter min="0" max="100" value={n.friendship}/><button onClick={() => game.socialize(n.id)}>Talk</button></article>)}</>}
          {tab === 'Inventory' && <><h3>Backpack</h3><div className="inventory">{game.inventory.map(item => <article key={item.id}><span>{item.icon}</span><b>{item.name}</b><small>×{item.quantity}</small></article>)}</div><button className="wide-action" onClick={() => game.addItem('calculator')}>Search Locker</button></>}
          {tab === 'Clubs' && <><h3>School Clubs</h3>{CLUBS.map(club => <article className="club" key={club}><span>✦</span><b>{club}</b>{game.clubs.includes(club) ? <em>Joined</em> : <button onClick={() => game.joinClub(club)}>Join</button>}</article>)}</>}
        </div>
      </aside>
    </div>

    <footer className="game-footer"><div><span>Actions</span><b>{game.lastAction || 'Choose your next move'}</b></div><button onClick={game.autoSave}>Save Game</button><button onClick={game.advance}>Advance {period === 'After School' ? 'Day' : 'Period'} →</button></footer>
    {toastShown && <div className="toast">{game.toast || game.event}</div>}

    {game.screen === 'pause' && <div className="modal-backdrop"><section className="pause-menu"><p>NORTHBRIDGE HIGH</p><h2>Paused</h2><button className="primary" onClick={game.resume}>Resume</button><button onClick={game.save}>Save</button><button onClick={game.load}>Load</button><button onClick={() => game.muted !== undefined && game.setMuted(!game.muted)}>Sound</button><button onClick={game.backToMenu}>Exit to Menu</button></section></div>}
  </main>
}

export default App
