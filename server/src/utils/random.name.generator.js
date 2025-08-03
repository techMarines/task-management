// prettier-ignore
const randomWords = [
    'Time', 'Past', 'Future', 'Dev', 'Fly', 'Flying', 'Soar', 'Soaring', 'Power', 'Falling', 'Fall', 'Jump', 'Cliff', 'Mountain', 'Rend', 'Red', 'Blue',
    'Green', 'Yellow', 'Gold', 'Panda', 'Cat', 'Kitty', 'Kitten', 'Zero', 'Memory', 'Trooper', 'Bandit', 'Fear', 'Light', 'Glow', 'Tread', 'Deep',
    'Deeper', 'Deepest', 'Mine', 'Your', 'Worst', 'Force', 'Video', 'Donkey', 'Magnum', 'Redeem', 'Code', 'Script', 'Writer', 'Near', 'Close', 'Open',
    'Cube', 'Circle', 'Geo', 'Genome', 'Germ', 'Echo', 'Beta', 'Alpha', 'Gamma', 'Omega', 'Seal', 'Squid', 'Money', 'Cash', 'Rest', 'Fire', 'Flame',
    'Morrow', 'Break', 'Breaker', 'Numb', 'Ice', 'Cold', 'Sick', 'Camel', 'Rooster', 'Sand', 'Desert', 'Dessert', 'Hurdle', 'Racer', 'Eraser', 'Erase',
    'Big', 'Small', 'Short', 'Tall', 'Sith', 'Bounty', 'Hunter', 'Cracked', 'Broken', 'Sad', 'Happy', 'Joy', 'Joyful', 'Crimson', 'Destiny', 'Deceit',
    'Lies', 'Lie', 'Honest', 'Destined', 'Bloxxer', 'Hawk', 'Eagle', 'Hawker', 'Walker', 'Zombie', 'Sarge', 'Capt', 'Captain', 'Punch', 'One', 'Two',
    'Uno', 'Slice', 'Slash', 'Melt', 'Melted', 'Melting', 'Fell', 'Wolf', 'Hound', 'Legacy', 'Sharp', 'Dead', 'Mew', 'Chuckle', 'Bubba', 'Bubble',
    'Sandwich', 'Smasher', 'Extreme', 'Multi', 'Universe', 'Ultimate', 'Death', 'Ready', 'Monkey', 'Elevator', 'Wrench', 'Grease', 'Theme', 'Grand',
    'Cool', 'Vortex', 'Paradox', 'River', 'Storm', 'Cloud', 'Sky', 'Stone', 'Wood', 'Leaf', 'Ocean', 'Wave', 'Sun', 'Moon', 'Star', 'Pixel', 'Matrix',
    'Glitch', 'Byte', 'Circuit', 'Droid', 'Comet', 'Nova', 'Orion', 'Probe', 'Quest', 'Nexus', 'Drift', 'Shift', 'Forge', 'Saber', 'Shield', 'Rogue',
    'Knight', 'Spark', 'Vibe', 'Silver', 'Amber', 'Onyx', 'Azure', 'Solid', 'Swift', 'Silent', 'Pulse', 'Rift', 'Core'
];

export function generateRandomName() {
    const nameLen = 3;
    const len = randomWords.length;
    const selectedWords = [];
    for (let i = 0; i < nameLen; i++) {
        const randomWord = randomWords[Math.floor(Math.random() * len)];
        selectedWords.push(randomWord);
    }
    return selectedWords.join("_");
}
