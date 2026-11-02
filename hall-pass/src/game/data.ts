import type { Achievement, LocationId, NPC, Period, Quest, Teacher } from '../types/game'

export const PERIODS: Period[] = ['Period 1', 'Period 2', 'Lunch', 'Period 3', 'Period 4', 'After School']
export const LOCATIONS: LocationId[] = ['Main Hallway', 'Library', 'Gym', 'Cafeteria', 'Classrooms', 'Counselor Office', 'Principal Office', 'Computer Lab', 'Courtyard']
export const CLASSES = ['Math', 'Science', 'English', 'History', 'Art', 'Music', 'Physical Education', 'Computer Science']
export const CLUBS = ['Gaming Club', 'Art Club', 'Drama Club', 'Chess Club', 'Robotics Club', 'Music Club', 'Sports Team']
export const ITEMS = [
  ['hall-pass', 'Hall Pass', '🎫'], ['notebook', 'Notebook', '📓'], ['laptop', 'Laptop', '💻'], ['backpack', 'Backpack', '🎒'], ['textbook', 'Textbook', '📕'], ['energy-drink', 'Energy Drink', '⚡'], ['calculator', 'Calculator', '🧮'],
]

export const NPCS: NPC[] = ['Maya Chen', 'Jordan Brooks', 'Riley Park', 'Theo Alvarez', 'Sam Okafor', 'Alex Rivera'].map((name, index) => ({
  id: `npc-${index}`, name, grade: (index % 4) + 1, personality: ['Warm', 'Driven', 'Playful', 'Quiet', 'Bold', 'Curious'][index],
  interests: [['drawing', 'music'], ['gaming', 'debate'], ['soccer', 'comedy'], ['reading', 'chess'], ['robotics', 'basketball'], ['coding', 'photography']][index], friendship: 0,
}))

export const TEACHERS: Teacher[] = [
  { name: 'Ms. Okonkwo', subject: 'Math', strictness: 4, personality: 'Demanding but fair' },
  { name: 'Mr. Finch', subject: 'Science', strictness: 3, personality: 'Curious mentor' },
  { name: 'Mrs. Bell', subject: 'English', strictness: 4, personality: 'Soft-spoken' },
  { name: 'Coach Reyes', subject: 'Physical Education', strictness: 3, personality: 'High energy' },
  { name: 'Mr. Patel', subject: 'Computer Science', strictness: 2, personality: 'Patient innovator' },
]

export const INITIAL_QUESTS: Quest[] = [
  { id: 'notes', title: 'Deliver Notes', description: 'Take Ms. Bell’s notes to the library.', progress: 0, goal: 1, reward: 25, completed: false },
  { id: 'lost-item', title: 'Find the Lost Item', description: 'Search the courtyard for someone’s missing calculator.', progress: 0, goal: 1, reward: 40, completed: false },
  { id: 'join-club', title: 'Join a Club', description: 'Find a club that matches your interests.', progress: 0, goal: 1, reward: 30, completed: false },
  { id: 'homework', title: 'Finish Homework', description: 'Complete a focused study session.', progress: 0, goal: 1, reward: 35, completed: false },
]

const achievementSeed = [
  ['first-day', 'First Day', 'Survive your first day as a freshman.'], ['perfect-attendance', 'Perfect Attendance', 'Attend every class for a full week.'], ['straight-a', 'Straight-A Student', 'Reach a 4.0 GPA.'], ['class-clown', 'Class Clown', 'Make a memorable impression.'], ['tech-genius', 'Tech Genius', 'Reach Technology level 5.'], ['athlete', 'Athlete', 'Reach Sports level 5.'], ['millionaire', 'Millionaire Student', 'Earn $1,000.'], ['club-hopper', 'Club Hopper', 'Join a school club.'], ['social-butterfly', 'Social Butterfly', 'Become friends with 3 students.'], ['detention-free', 'Clean Record', 'Graduate without detention.'], ['lunch-line', 'Lunch Regular', 'Eat in the cafeteria 10 times.'], ['night-owl', 'Night Owl', 'Finish an after-school activity.'], ['bookworm', 'Bookworm', 'Study in the library 5 times.'], ['court-star', 'Court Star', 'Score in the gym.'], ['stage-ready', 'Stage Ready', 'Join the drama club.'], ['robotics', 'Future Engineer', 'Join robotics club.'], ['pixel-pro', 'Pixel Pro', 'Join gaming club.'], ['creative-mind', 'Creative Mind', 'Reach Creativity level 5.'], ['charismatic', 'Charismatic', 'Reach Charisma level 5.'], ['scholar', 'Scholar', 'Reach Academics level 5.'], ['popularity', 'Campus Legend', 'Reach 80 popularity.'], ['money-maker', 'Money Maker', 'Earn your first $100.'], ['early-bird', 'Early Bird', 'Attend Period 1 all week.'], ['explorer', 'Explorer', 'Visit every campus location.'], ['mentor', 'Mentor', 'Complete all starter quests.'], ['helper', 'Helper', 'Complete a teacher quest.'], ['homework', 'Homework Hero', 'Finish homework three times.'], ['friendship', 'Good Company', 'Reach Best Friend status.'], ['graduation', 'Graduate', 'Complete senior year.'], ['snow-day', 'Snow Day Survived', 'Experience a snow day.'], ['dance-night', 'Dance Floor', 'Attend the school dance.'], ['talent-show', 'Talent Unlocked', 'Perform in the talent show.'], ['champion', 'Champion', 'Win a sports championship.'], ['election', 'Student Voice', 'Win a student election.'], ['quiz-master', 'Quiz Master', 'Ace a pop quiz.'], ['fire-drill', 'Calm in Chaos', 'Handle a fire drill.'], ['principal', 'Principal’s List', 'Meet with the principal.'], ['counselor', 'Counselor’s Corner', 'Visit the counselor.'], ['reputation', 'Reputation Builder', 'Reach 75 reputation.'], ['detention', 'Rule Breaker', 'Receive detention.'], ['comeback', 'Comeback', 'Recover from 30 stress.'], ['well-rested', 'Well Rested', 'Restore full energy.'], ['healthy', 'Healthy Start', 'Restore full health.'], ['inventory', 'Prepared Student', 'Carry five unique items.'], ['year-two', 'Sophomore', 'Advance to sophomore year.'], ['year-three', 'Junior', 'Advance to junior year.'], ['year-four', 'Senior', 'Advance to senior year.'], ['memory-maker', 'Memory Maker', 'Spend 100 school days.'], ['legend', 'Hall Pass Legend', 'Unlock 40 achievements.'], ['skully', 'Skully’s Choice', 'Discover every ending.'],
] as string[][]
export const ACHIEVEMENTS: Achievement[] = achievementSeed.map(([id, title, description]) => ({ id, title, description, icon: ['🎓','✓','★','😄','💻','🏅'][achievementSeed.findIndex(a => a[0] === id) % 6] }))

export const ANNOUNCEMENTS = ['Pep rally after school in the gym.', 'The counselor is accepting appointment requests.', 'Today’s lunch special: mystery pizza.', 'Robotics Club meets in the computer lab.', 'Keep the courtyard clean for tomorrow’s assembly.', 'Library quiet hours begin after lunch.']
export const WEATHER = ['Clear', 'Sunny', 'Cloudy', 'Windy', 'Rainy', 'Cold']
export const RANDOM_EVENTS = ['Pop Quiz', 'Fire Drill', 'Snow Day', 'School Dance', 'Talent Show', 'Sports Championship', 'Student Election']
