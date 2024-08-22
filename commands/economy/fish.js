const {EmbedBuilder} = require('discord.js');
const Cooldowns = require('../../schemas/Cooldowns');
const UserProfile = require('../../schemas/UserProfile');
const FishFound = require('../../schemas/FishFound');
const FishingRods = require('../../schemas/UserFishingInfo');
const UserArtifacts = require('../../schemas/UserArtifacts');
const JackpotFish = require('../../schemas/JackpotFish');
const UserHazmatInfo = require('../../schemas/UserHazmatInfo');
const MysteryEgg = require('../../schemas/MysteryEgg');

const commonFish = [
    {fish: "Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Oshawott", price: 10, lW: 10, hW: 20, rod: 0 },
    {fish: "Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Golden Catfish", price: 80, lW: 5, hW: 120, rod: 0 },
    {fish: "Clownfish", price: 15, lW: 1, hW: 250, rod: 0 },
    {fish: "Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Rusted Tin Can", price: 1, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Tilapia", price: 5, lW: 0.5, hW: 6, rod: 0 },
    {fish: "Haddock", price: 10, lW: 2, hW: 10, rod: 0 },
    {fish: "Darkfish", price: 15, lW: 1, hW: 15, rod: 0 },
    {fish: "Mishu", price: 15, lW: 10, hW: 15, rod: 0 },
    {fish: "Dhufish", price: 20, lW: 5, hW: 25, rod: 0 },
    {fish: "Driftfish", price: 20, lW: 5, hW: 15, rod: 0 },
    {fish: "Dartfish", price: 15, lW: 1, hW: 5, rod: 0 },
    {fish: "Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Crucian Carp", price: 15, lW: 15, hW: 25, rod: 0 },
    {fish: "Inverted Clownfish", price: 22, lW: 15, hW: 25, rod: 0 },
    {fish: "Scalyfin", price: 14, lW: 15, hW: 25, rod: 0 },
    {fish: "Bitterling", price: 12, lW: 1, hW: 5, rod: 0 },
    {fish: "Parrotfish", price: 15, lW: 10, hW: 25, rod: 0 },
    {fish: "Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Arctic Char", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Bluefish", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Clown Knife Fish", price: 20, lW: 1, hW: 5, rod: 1 },
    {fish: "Ironfish", price: 30, lW: 1, hW: 8, rod: 2 },
    {fish: "Common Ling", price: 30, lW: 2, hW: 5, rod: 2 },
    {fish: "Crapple", price: 30, lW: 2, hW: 5, rod: 2 },
    {fish: "Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
]

const uncommonFish = [
    {fish: "Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Turtle", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Perch", price: 25, lW: 0.1, hW: 5, rod: 0 },
    {fish: "Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Crackfish", price: 24, lW: 15, hW: 25, rod: 0 },
    {fish: "Fentfish", price: 22, lW: 15, hW: 25, rod: 0 },
    {fish: "Kirby", price: 30, lW: 25, hW: 30, rod: 0 },
    {fish: "Lightfish", price: 25, lW: 1, hW: 10, rod: 0 },
    {fish: "Marblefish", price: 20, lW: 25, hW: 35, rod: 0 },
    {fish: "Paddlefish", price: 25, lW: 5, hW: 15, rod: 0 },
    {fish: "Oxygen Cell (25%)", price: 20, lW: 10, hW: 15, rod: 0 },
    {fish: "Pearl Perch", price: 30, lW: 1, hW: 15, rod: 1 },
    {fish: "Queen Snapper (Australian)", price: 30, lW: 1, hW: 10, rod: 1 },
    {fish: "Queen Snapper (Caribbean)", price: 30, lW: 1, hW: 10, rod: 1 },
    {fish: "Atlantic Salmon", price: 30, lW: 0.5, hW: 10, rod: 1 },
    {fish: "Caramel Salmon", price: 50, lW: 1, hW: 20, rod: 1 },
    {fish: "Gengarfish", price: 80, lW: 1, hW: 20, rod: 2 },
    {fish: "Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Mangrove Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Vermillion Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
]

const rareFish = [
    {fish: "Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Sapphire Gemstonefish", price: 65, lW: 25, hW: 75, rod: 0 },
    {fish: "Ruby Gemstonefish", price: 60, lW: 25, hW: 75, rod: 0 },
    {fish: "Emerald Gemstonefish", price: 70, lW: 25, hW: 75, rod: 0 },
    {fish: "Topaz Gemstonefish", price: 60, lW: 25, hW: 75, rod: 0 },
    {fish: "Citrine Gemstonefish", price: 50, lW: 25, hW: 75, rod: 0 },
    {fish: "Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Fortnite Shield Potion", price: 50, lW: 15, hW: 15, rod: 0 },
    {fish: "Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Pacific Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Guardian", price: 35, lW: 20, hW: 35, rod: 0 },
    {fish: "Colfish", price: 32, lW: 15, hW: 45, rod: 0 },
    {fish: "Dogfish", price: 34, lW: 20, hW: 45, rod: 0 },
    {fish: "Alligator", price: 30, lW: 25, hW: 45, rod: 0 },
    {fish: "Sea Gato", price: 35, lW: 8, hW: 16, rod: 0 },
    {fish: "Gurnard", price: 35, lW: 5, hW: 25, rod: 0 },
    {fish: "Oxygen Cell (50%)", price: 50, lW: 10, hW: 15, rod: 0 },
    {fish: "Scorpionfish", price: 55, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Weltfish", price: 90, lW: 10, hW: 15, rod: 3 },
    {fish: "Lustrous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
    {fish: "Luminous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
]

const epicFish = [
    {fish: "Mysterious Egg", price: 1, lW: 5, hW: 20, rod: 0 },
    {fish: "Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Tenzfish", price: 160, lW: 10, hW: 22, rod: 0 },
    {fish: "Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Mbappefish", price: 125, lW: 5, hW: 20, rod: 0 },
    {fish: "Aurafish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Motionfish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Poufish", price: 105, lW: 25, hW: 50, rod: 0 },
    {fish: "Motionfish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Tittyfish", price: 155, lW: 5, hW: 20, rod: 0 },
    {fish: "Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Stalinefish", price: 135, lW: 5, hW: 20, rod: 0 },
    {fish: "Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Lovefish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Sl1ckfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Goldfish (The Species)", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Goldfish (The Snack)", price: 105, lW: 0.1, hW: 0.1, rod: 0 },
    {fish: "Rosetoyfish", price: 165, lW: 1, hW: 2, rod: 0 },
    {fish: "Madelyn-Clinefish", price: 165, lW: 130, hW: 150, rod: 0 },
    {fish: "Hazmat Leggings", price: 100, lW: 10, hW: 15, rod: 0 },
    {fish: "Oxygen Cell (75%)", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Hazmat Chestplate", price: 100, lW: 10, hW: 15, rod: 0 },
    {fish: "Elder Guardian", price: 140, lW: 75, hW: 125, rod: 1 },
    {fish: "Makifish", price: 125, lW: 155, hW: 155, rod: 1 },
    {fish: "Diamond Catfish", price: 150, lW: 25, hW: 150, rod: 1 },
    {fish: "Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Kanto Kenta Kahuna", price: 145, lW: 60, hW: 280, rod: 2 },
]

const legendaryFish = [
    {fish: "Narwhal", price: 80, lW: 1500, hW: 2500, rod: 0 },
    {fish: "Messifish", price: 325, lW: 10, hW: 20, rod: 0 },
    {fish: "Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Mamahuevofish", price: 500, lW: 125, hW: 165, rod: 0 },
    {fish: "Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Giant Squid", price: 170, lW: 300, hW: 1000, rod: 0 },
    {fish: "Hazmat Boots", price: 5, lW: 10, hW: 15, rod: 0 },
    {fish: "Hazmat Helmet", price: 520, lW: 10, hW: 15, rod: 0 },
    {fish: "Oxygen Cell (100%)", price: 520, lW: 10, hW: 15, rod: 0 },
    {fish: "Le-Sunshine", price: 300, lW: 200, hW: 300, rod: 0 },
    {fish: "Sapphire Catfish", price: 400, lW: 50, hW: 200, rod: 1 },
    {fish: "Ruby Catfish", price: 400, lW: 45, hW: 200, rod: 1 },
    {fish: "Emerald Catfish", price: 400, lW: 55, hW: 200, rod: 1 },
    {fish: "Topaz Catfish", price: 400, lW: 60, hW: 200, rod: 1 },
    {fish: "Yunjinfish", price: 500, lW: 117, hW: 117, rod: 1 },
    {fish: "Tole Tole", price: 340, lW: 15, hW: 20, rod: 1 },
    {fish: "Chaewonfish", price: 500, lW: 93, hW: 93, rod: 1 },
    {fish: "Numby", price: 310, lW: 15, hW: 25, rod: 1 },
]

const exoticFish = [
    {fish: "Jackpot Fish", price: 1, lW: 10, hW: 10, rod: 0 },
    {fish: "Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Attachable Oxygen Tank", price: 1200, lW: 10, hW: 15, rod: 0 },
    {fish: "Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Satorufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Arlecchinofish", price: 1400, lW: 10, hW: 20, rod: 0 },
    {fish: "Sugurufish", price: 1400, lW: 10, hW: 10, rod: 0 },
    {fish: "Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Blue Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
    {fish: "Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Platinum Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    {fish: "Swimsuit Acheron", price: 3000, lW: 140, hW: 140, rod: 2},
]

const commonRelic = [
    {fish: "Music Note", price: 1, lW: 10, hW: 10, rod: 0 },
]

const uncommonRelic = [
    {fish: "Shiny Hook", price: 1, lW: 5, hW: 5, rod: 0 },
]

const rareRelic = [
    {fish: "Sapphire Gem", price: 1, lW: 30, hW: 30, rod: 0 },
]

const exoticRelic = [
    {fish: "Poker Chip", price: 1, lW: 35, hW: 100, rod: 0 },
]

const wyvernHuntPool = [
    {animal: "Dracula Parrot", price: 1500, lW: 10, hW: 20},
    {animal: "Raven", price: 500, lW: 10, hW: 20},
    {animal: "Razorbill", price: 500, lW: 10, hW: 20},
    {animal: "Bald Eagle", price: 240, lW: 10, hW: 20},
    {animal: "Vulture", price: 110, lW: 30, hW: 50},
    {animal: "Black Swan", price: 70, lW: 10, hW: 20},
    {animal: "Great Blue Heron", price: 65, lW: 10, hW: 20},
    {animal: "Osprey", price: 50, lW: 10, hW: 20},
    {animal: "Owl", price: 20, lW: 10, hW: 20},
    {animal: "Blue Jay", price: 20, lW: 10, hW: 20},
]

//---------------------------------------------------
const commonOcean = [
    {fish: "American Horseshoe Crab", price: 100, lW: 35, hW: 50, rod: 3 },
    {fish: "American Lobster", price: 100, lW: 5, hW: 10, rod: 3 },
    {fish: "American Oyster", price: 100, lW: 5, hW: 40, rod: 3 },
    {fish: "Antarctic Krill", price: 100, lW: 1, hW: 2, rod: 3 },
    {fish: "Argentine Shortfin Squid", price: 100, lW: 35, hW: 70, rod: 3 },
    {fish: "Atlantic Blue Crab", price: 100, lW: 25, hW: 40, rod: 3 },
    {fish: "Blue King Crab", price: 100, lW: 35, hW: 50, rod: 3 },
    {fish: "Broadclub Cuttlefish", price: 100, lW: 1, hW: 10, rod: 3 },
    {fish: "Caribbean Spiny Lobster", price: 100, lW: 10, hW: 20, rod: 3 },
    {fish: "Caribbean Reef Octopus", price: 100, lW: 25, hW: 50, rod: 3 },
    {fish: "Chambered Nautilus", price: 100, lW: 15, hW: 20, rod: 3 },
    {fish: "Colorful Hermit Crab", price: 100, lW: 15, hW: 40, rod: 3 },
    {fish: "Decorator Crab", price: 100, lW: 10, hW: 30, rod: 3 },
    {fish: "Dumbo Octopus", price: 100, lW: 35, hW: 50, rod: 3 },
    {fish: "Flamboyant Cuttlefish", price: 100, lW: 15, hW: 40, rod: 3 },
    {fish: "Hawaiian Bobtail Squid", price: 100, lW: 15, hW: 50, rod: 3 },
    {fish: "Peacock Mantis Shrimp", price: 120, lW: 1, hW: 3, rod: 3 },
    {fish: "Red King Crab", price: 110, lW: 15, hW: 35, rod: 3 },
    {fish: "Flatback Turtle", price: 100, lW: 15, hW: 60, rod: 3 },
    {fish: "Green Turtle", price: 115, lW: 35, hW: 70, rod: 3 },
    {fish: "Banded Sea Krait", price: 120, lW: 35, hW: 90, rod: 3 },
    {fish: "Hawksbill Turtle", price: 115, lW: 30, hW: 100, rod: 3 },
    {fish: "Kemp's Ridley Turtle", price: 150, lW: 35, hW: 100, rod: 3 },
    {fish: "Olive Sea Snake", price: 140, lW: 35, hW: 55, rod: 3 },
    {fish: "Shark", price: 100, lW: 45, hW: 200, rod: 3 },
    {fish: "Rattailfish", price: 100, lW: 5, hW: 20, rod: 3 },
    {fish: "Sea pig", price: 110, lW: 1, hW: 10, rod: 3 },
    {fish: "Spiny Star", price: 110, lW: 5, hW: 10, rod: 3 },
    {fish: "Strawberry Squid", price: 110, lW: 40, hW: 100, rod: 3 },
    {fish: "Sponge", price: 120, lW: 1, hW: 1, rod: 3 },

]
const uncommonOcean = [
    {fish: "Leatherback Turtle", price: 270, lW: 35, hW: 100, rod: 3 },
    {fish: "Marine Iguana", price: 200, lW: 10, hW: 30, rod: 3 },
    {fish: "Blue Shark", price: 210, lW: 35, hW: 150, rod: 3 },
    {fish: "Basking Shark", price: 210, lW: 25, hW: 150, rod: 3 },
    {fish: "Blue Spotted Ribbontail Ray", price: 220, lW: 15, hW: 20, rod: 3 },
    {fish: "Bull Shark", price: 200, lW: 25, hW: 140, rod: 3 },
    {fish: "Cownose Ray", price: 200, lW: 10, hW: 30, rod: 3 },
    {fish: "Giant Devil Ray", price: 210, lW: 10, hW: 100, rod: 3 },
    {fish: "Goblin Shark", price: 220, lW: 15, hW: 100, rod: 3 },
    {fish: "Lemon Shark", price: 230, lW: 15, hW: 140, rod: 3 },
    {fish: "Nurse Shark", price: 210, lW: 25, hW: 140, rod: 3 },
    {fish: "Southern Stringray", price: 240, lW: 15, hW: 50, rod: 3 },
    {fish: "Spotted Eagle Ray", price: 200, lW: 15, hW: 60, rod: 3 },
    {fish: "Bottlenose Dolphin", price: 230, lW: 35, hW: 140, rod: 3 },
    {fish: "Gray Seal", price: 230, lW: 35, hW: 120, rod: 3 },
    {fish: "California Sun Star", price: 210, lW: 100, hW: 200, rod: 3 },
    {fish: "Otter", price: 210, lW: 5, hW: 20, rod: 3 },
    {fish: "Japanese Spider Crab", price: 210, lW: 5, hW: 15, rod: 3 },
    {fish: "Giant Isopod", price: 250, lW: 35, hW: 50, rod: 3 },

]

const rareOcean = [
    {fish: "Hammerhead Shark", price: 450, lW: 35, hW: 100, rod: 3 },
    {fish: "Longfin Mako Shark", price: 455, lW: 35, hW: 100, rod: 3 },
    {fish: "Longnose Sawshark", price: 440, lW: 35, hW: 100, rod: 3 },
    {fish: "Marbled Electric Ray", price: 430, lW: 35, hW: 100, rod: 3 },
    {fish: "Pacific Angel Shark", price: 456, lW: 35, hW: 100, rod: 3 },
    {fish: "Atlantic Angel Shark", price: 450, lW: 35, hW: 100, rod: 3 },
    {fish: "Sand Tiger Shark", price: 451, lW: 35, hW: 100, rod: 3 },
    {fish: "Scalloped Hammerhead Shark", price: 440, lW: 35, hW: 100, rod: 3 },
    {fish: "Shortfin Mako Shark", price: 430, lW: 35, hW: 100, rod: 3 },
    {fish: "Shovelnouse Guitarfish", price: 460, lW: 35, hW: 100, rod: 3 },
    {fish: "Spiny Dogfish", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "Spinner Shark", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "Zebra Shark", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "Whale Shark", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "White Shark", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "Gray Whale", price: 470, lW: 35, hW: 100, rod: 3 },
    {fish: "Harbor Seal", price: 440, lW: 35, hW: 100, rod: 3 },
    {fish: "Harp Seal", price: 460, lW: 35, hW: 100, rod: 3 },
    {fish: "Hawaiian Monk Seal", price: 440, lW: 35, hW: 100, rod: 3 },
    {fish: "Hourglass Dolphin", price: 445, lW: 35, hW: 100, rod: 3 },
    {fish: "Deep-Sea Anglerfish", price: 430, lW: 35, hW: 100, rod: 3 },
    {fish: "Sea Angel", price: 455, lW: 35, hW: 100, rod: 3 },
    {fish: "Sea Goat", price: 445, lW: 35, hW: 100, rod: 3 },
    {fish: "Weltfish", price: 90, lW: 10, hW: 15, rod: 3 },
    {fish: "Lustrous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
    {fish: "Luminous Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
]

const epicOcean = [
    {fish: "Giant Pacific Octopus", price: 650, lW: 130, hW: 200, rod: 3 },
    {fish: "Southern Blue Ringed-Octupus", price: 750, lW: 35, hW: 80, rod: 3 },
    {fish: "Striped Pyjama Squid", price: 655, lW: 35, hW: 110, rod: 3 },
    {fish: "Vampire Squid", price: 640, lW: 55, hW: 180, rod: 3 },
    {fish: "Blacktip Shark", price: 640, lW: 135, hW: 210, rod: 3 },
    {fish: "Cookiecutter Shark", price: 640, lW: 35, hW: 120, rod: 3 },
    {fish: "Tiger Shark", price: 750, lW: 135, hW: 300, rod: 3 },
    {fish: "Beluga Whale", price: 750, lW: 50, hW: 190, rod: 3 },
    {fish: "Humpback Whale", price: 200, lW: 200, hW: 3000, rod: 3 },
    {fish: "Spinner Dolphin", price: 650, lW: 35, hW: 210, rod: 3 },
    {fish: "Sawfish", price: 650, lW: 55, hW: 190, rod: 3 },
    {fish: "Dragonfish", price: 650, lW: 55, hW: 120, rod: 3 },
    {fish: "Fangtooth", price: 650, lW: 35, hW: 65, rod: 3 },
    {fish: "Flapjack Octopus", price: 750, lW: 15, hW: 35, rod: 3 },
    {fish: "Giant Sea Spider", price: 680, lW: 5, hW: 16, rod: 3 },
    {fish: "Glass Squid", price: 680, lW: 85, hW: 120, rod: 3 },
    {fish: "Pearl Octopus", price: 650, lW: 35, hW: 150, rod: 3 },
    {fish: "Laternfish", price: 750, lW: 35, hW: 60, rod: 3 },
    {fish: "Sea Nymph", price: 750, lW: 135, hW: 170, rod: 3 },
    {fish: "Water Spirit", price: 750, lW: 15, hW: 35, rod: 3 },
    {fish: "Milotic", price: 950, lW: 15, hW: 35, rod: 5 },


]
const legendaryOcean = [
    {fish: "Colossal Squid", price: 1000, lW: 355, hW: 600, rod: 3 },
    {fish: "Great Hammerhead Shark", price: 1010, lW: 125, hW: 300, rod: 3 },
    {fish: "Giant Manta Ray", price: 1020, lW: 65, hW: 140, rod: 3 },
    {fish: "Oceanic Whitetip Shark", price: 1250, lW: 95, hW: 200, rod: 3 },
    {fish: "Oceanic Blacktip Shark", price: 1250, lW: 95, hW: 200, rod: 3 },
    {fish: "Megamouth Shark", price: 1010, lW: 105, hW: 200, rod: 3 },
    {fish: "California Sea Lion", price: 1030, lW: 95, hW: 150, rod: 3 },
    {fish: "Orca", price: 1100, lW: 350, hW: 700, rod: 3 },
    {fish: "Polar Bear", price: 1020, lW: 80, hW: 160, rod: 3 },
    {fish: "Warlus", price: 1000, lW: 80, hW: 130, rod: 3 },
    {fish: "Psychedelic Jelly", price: 1530, lW: 25, hW: 35, rod: 3 },
    {fish: "Giant Siphonophore", price: 1100, lW: 35, hW: 50, rod: 3 },
    {fish: "Mermaid", price: 1100, lW: 100, hW: 150, rod: 3 },

]

const exoticOcean = [
    {fish: "Treasure Chest", price: 1, lW: 50, hW: 100, rod: 3 },
    {fish: "Great White Shark", price: 3500, lW: 240, hW: 1200, rod: 3 },
    {fish: "Blue Whale", price: 3200, lW: 400, hW: 2000, rod: 3 },
    {fish: "Deep-Sea Crown Jellyfish", price: 3100, lW: 45, hW: 90, rod: 3 },
    {fish: "Giant Phantom Jellyfish", price: 3200, lW: 65, hW: 120, rod: 3 },
    {fish: "Silky Jellyfish", price: 3500, lW: 35, hW: 100, rod: 3 },
    {fish: "Deep-Sea Water Hydra", price: 3150, lW: 105, hW: 300, rod: 3 },
    {fish: "Siren", price: 3100, lW: 130, hW: 160, rod: 3 },

]


function generateRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

function loopThroughRarity(rarity, rodLevel){
    let counter = 0;
    for(const x in rarity){
        if(rarity[x].rod <= rodLevel){
            counter++
        }
    }
    return counter;
}

function determineFishing(rodLevel){
    // let choice = Math.floor(generateRandomNumber(1,101));
    // //0 = default. 1 = good, 2 = great, = 3 super, 4 = ultra, 5 = master, 6 = champion's, 7 = kings rod, 8 = legends, 9 = music's
    // if(rodLevel == 0){ // default 70/30
    //     if(choice >= 31){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel == 1){ //good 75/25
    //     if(choice >= 26){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel == 2){ //great 80/20
    //     if(choice >= 21){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel == 3){ //super 85/15
    //     if(choice >= 16){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel == 4){ //ultra 90/10
    //     if(choice >= 11){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel == 5){ //masters 95/5
    //     if(choice >= 6){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }else if(rodLevel >= 6){ //champions 100
    //     return true;
    // }
    
    if(rodLevel >= 0){
        return true;
    }else{
        return true;
    }
}

module.exports = {
    run: async ({ interaction }) => {
        if (!interaction.inGuild()) {
            interaction.reply({
                content: "This command can only be executed inside a server.",
                ephemeral: true,
            });
            return;
        }
    try {
        await interaction.deferReply();

        const commandName = "fish";
        const userId = interaction.user.id;
        const guildId = interaction.guild.id;
        let userProfile = await UserProfile.findOne({ userId: interaction.member.id, });
        let cooldown = await Cooldowns.findOne({ userId, commandName });
        let fishFound = await FishFound.findOne({ userId, });
        let fishingRods = await FishingRods.findOne({ userId, });
        let userArtifacts = await UserArtifacts.findOne({ userId, });
        let jackpotFish = await JackpotFish.findOne({ guildId });
        let userHazmatInfo = await UserHazmatInfo.findOne({ userId, });
        let mysteryEgg = await MysteryEgg.findOne({userId});
        

        if(!fishFound){
            fishFound = new FishFound({userId})
        }
        if(!userProfile){
            userProfile = new UserProfile({userId});
        }
        if(!userArtifacts){
            userArtifacts = new UserArtifacts({userId});
        }
        if(!fishingRods){
            fishingRods = new FishingRods({userId});
        }
        if(!jackpotFish){
            jackpotFish = new JackpotFish({ guildId });
        }
        if(!userHazmatInfo){
            userHazmatInfo = new UserHazmatInfo({ userId});
        }
        if (cooldown && Date.now() < cooldown.endsAt) {
            const { default: prettyMs } = await import('pretty-ms'); 

            await interaction.editReply({
                content: `You can use /fish again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
                ephemeral: true,
            });
            return;
        }
        if (!cooldown) {
            cooldown = new Cooldowns({userId, commandName});
        }
        if(!mysteryEgg){
            mysteryEgg = new MysteryEgg({userId});
        }

        let typeOfFish;
        const rodType = fishingRods.fishingRod;
        let text = "";
        let sellprice = 0;
        let fishEmbed = new EmbedBuilder();
        let maybeRelic;
        let relicName;
        let relicWeight;
        let relicStr;

        function determineMutation(){
            let mutate = Math.floor(generateRandomNumber(1, 31));
            let typeOfMutation = Math.floor(generateRandomNumber(1,101));
            console.log('mutating: ' + mutate);
            let result = "";
            let multimoney = 1;
            let multiweight = 1;
            if(mutate == 9){ 
                if(typeOfMutation >= 1 && typeOfMutation <= 15){
                    result += "***MUTATION X***\n";
                    multimoney = 15;
                    multiweight = 1;
                }else if(typeOfMutation >= 16 && typeOfMutation <= 30){
                    result += "***MUTATION Y***\n";
                    multiweight = 20;
                    multimoney = 1;
                }else if(typeOfMutation >= 31 && typeOfMutation <= 45){
                    result += "***MUTATION A***\n";
                    multiweight = 2;
                    multimoney = 10;
                }else if(typeOfMutation >= 46 && typeOfMutation <= 60){
                    result += "***MUTATION V***\n";
                    multiweight = 15;
                    multimoney = 5;
                }else if(typeOfMutation >= 61 && typeOfMutation <= 75){
                    result += "***MUTATION Z***\n";
                    multiweight = 10;
                    multimoney = 7.5;        
                }else if(typeOfMutation >= 76 && typeOfMutation <= 81){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += "***Variant: ICE***\n";
                    multiweight = 1;
                    multimoney = 5;
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.iceshards++;
                        result += "You Found 1 Rare **Ice Shard\n**";
                    } 
                }else if(typeOfMutation >= 82 && typeOfMutation <= 87){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += "***Variant: FIRE***\n";
                    multiweight = 1;
                    multimoney = 5;
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.fireshards++;
                        result += "You Found 1 Rare **Fire Shard\n**";
                    }         
                }else if(typeOfMutation >= 88 && typeOfMutation <= 93){
                    result += "***RARE ELEMENTAL MUTATION***\n";
                    result += "***Variant: WIND***\n";
                    multiweight = 1;
                    multimoney = 5;  
                    let decision = Math.floor(generateRandomNumber(1,6));
                    if(decision == 1){
                        fishFound.windshards++;
                        result += "You Found 1 Rare **Wind Shard**\n";
                    }       
                }else if(typeOfMutation == 100 || typeOfMutation == 99){
                    result += "***SUPER RARE VOID MUTATION***\n";
                    let decision = Math.floor(generateRandomNumber(1,11));
                    if(decision == 1){
                        fishFound.voidshards++;
                        result += "You Found 1 EXTREMELY Rare **Void Shard**\n";
                    }  
                    let firstRoll = Math.floor(generateRandomNumber(35, 101));
                    let secondRoll = Math.floor(generateRandomNumber(1,firstRoll+1));
                    multimoney = secondRoll;
                    multiweight = firstRoll - secondRoll;
                    result += `***Variant: (${multimoney}-${multiweight})***\n`;
                }else if(typeOfMutation >= 94 && typeOfMutation <= 98){
                    result += "***VERY RARE MUTATION 8041***\n";
                    let decision = Math.floor(generateRandomNumber(1,3));
                    if(decision == 1){
                        result += "***Variant: (XX)***\n";
                        multiweight = 80.41;
                        multimoney = 1;
                    }else{
                        result += "***Variant: (XY)***\n";
                        multiweight = 1;
                        multimoney = 80.41;
                    }
                }
                return [1, result, multimoney, multiweight];
            }else{
                return [0, result, multimoney, multiweight];
            }
        }

        function decypher(artifact){
            let hasArtifact;
            let value;
            let text = artifact;
            hasArtifact = text.substring(0, text.indexOf('-'));
            value = text.substring(text.indexOf('-')+1, text.length);
            hasArtifact = parseInt(hasArtifact);
            value = parseFloat(value);
            return [hasArtifact, value];
        }
        
        function relic(rarity){
            let relicDecider = Math.floor(generateRandomNumber(1,101));
            console.log(relicDecider);
            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rarity, rodType)));
            let weight = generateRandomNumber(rarity[x].lW, rarity[x].hW).toFixed(1);
            let str = "";
            if(relicDecider == 1){
                if(rarity[x].fish == "Poker Chip"){
                    let text = userArtifacts.pokerChip;
                    let previous = text.substring(text.indexOf('-')+1, text.length);
                    if(previous > weight){
                        str += '●～●～●～●～●～●～●～●\n';
                        str += `*Your Current Relic Value is* ***Greater*** *Than This One.*\n`;
                        str += `***Not Replacing***`;
                    }else{
                        userArtifacts.pokerChip = `1-${weight}`;
                    }
                    return [1, rarity[x].fish, weight, str];    
                }
            }
            if(relicDecider <= 20){
                if(rarity[x].fish == "Music Note"){
                    userArtifacts.musicNote = `1-${weight}`;
                    return [1, rarity[x].fish, weight, str];    
                }else if(rarity[x].fish == "Shiny Hook"){
                    userArtifacts.shinyHook = `1-${weight}`;
                    return [1, rarity[x].fish, weight, str];    
                }
            }
            if(relicDecider <= 25){
                if(rarity[x].fish == "Sapphire Gem"){
                    userArtifacts.sapphireGem = `1-${weight}`;
                    return [1, rarity[x].fish, weight, str];
                }
            }

            return [0, " ", 0, " "];
        }

        function artifact(entry){
            let hasArtifact, artifactMulti, returnValue;
            [hasArtifact, artifactMulti] = decypher(entry);
            if(hasArtifact == 1){
                returnValue = (artifactMulti/100);
                // sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                // fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`);
                return returnValue;
            }else{
                return 0;
            }
        }
        

        function totalArtifactMulti(){
            let x;
            x = artifact(userArtifacts.pokerChip);
            x += artifact(userArtifacts.musicNote);
            x += artifact(userArtifacts.sapphireGem);
            x += artifact(userArtifacts.wyrm);
            x += artifact(userArtifacts.s1p1);
            x += artifact(userArtifacts.s1p2);
            x += artifact(userArtifacts.s1p3);
            x += artifact(userArtifacts.s1p4);
            x += artifact(userArtifacts.s1p5);

            return x;
        }

        function wyvernHunt(){
            let x = artifact(userArtifacts.wyvern);
            let text = "";
            if(x == 0){
                return [0, text];
            }else{
                let y = Math.floor(generateRandomNumber(0,10));
                let weight = generateRandomNumber(wyvernHuntPool[y].lW, wyvernHuntPool[y].hW + 0.1).toFixed(1);
                let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                money = (wyvernHuntPool[y].price * (25 + (weight * 0.1)));
                text += '●～●～●～●～●～●～●～●\n';
                text += `Your Wyvern hunted a(n) **${wyvernHuntPool[y].animal}**\n`;
                    if(gender == 1){ 
                        text += `Gender: **Male**\n`;
                        money *= 1.2 
                    }
                    if(gender == 2){
                        text += `Gender: **Female**\n`;
                        if(pregant == 69){
                            money *= 50;
                            text += `Pregnant: **Yes**\n`
                        }else{
                            text += `Pregnant: **No**\n`
                        }
                    }
                text += `Weight: **${weight}** lbs\n`;
                return [money, text];
            }
        }

        function fishing(typeOfFish, rodLevel, occurance, area){
            console.log("in fishing");
            console.log(area);
            let skip = 0;
            let desc = "";
            let mRResult;
            let mRBool = 0;
            let mRMoney;
            let mRWeight;
            let money = 0;
            let moneyMade = 0;
            let baseCommon = 41;
            let baseUncommon = 42;
            
            
            for(let i = 0; i < occurance; i++){
                if(area == "lake"){
                    if(determineFishing(rodLevel)){
                        let hasSH, multiSH;
                        [hasSH, multiSH] = decypher(userArtifacts.shinyHook);
                        if(hasSH == 1){
                            console.log("has artifact");
                            baseCommon -= multiSH;
                            baseUncommon -= multiSH;
                        }
                        typeOfFish = Math.floor(generateRandomNumber(1,101)); //determines rarity of fish 
                        console.log("fish: " + typeOfFish);   
                        if(typeOfFish >= 2 && typeOfFish <= baseCommon){
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(commonFish, rodLevel)));
                            let weight = generateRandomNumber(commonFish[x].lW, commonFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xffffff);
                            if(commonFish[x].fish == "Oshawott"){ pregant = 0; }
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += mRResult;
                                desc += '●～●～●～●～●～●～●～●\n';
                                weight *= mRWeight;
                                fishEmbed.setColor(0x6ce59d);
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                            money = (commonFish[x].price * (1 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${commonFish[x].fish}**\n`;
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            if(commonFish[x].fish == "Oshawott"){
                                let shiny = Math.floor(generateRandomNumber(1,126)); // 1/100 to get insane multiplier
                                if(shiny == 1){
                                    fishEmbed.setColor(0xF8FF0F);
                                    fishEmbed.addFields({name: " ", value: ":star: ***SHINY!!!***"});
                                    money *= 800;
                                }
                                [maybeRelic, relicName, relicWeight, relicStr] = relic(commonRelic);
                                if(maybeRelic == 1){
                                    fishEmbed.setColor(0x6002D5);
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += "Oh... What's This?? Looks Like \n";
                                    desc += "Oshawott was carrying something...\n"
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += `***RARE ARTIFACT***\n`;
                                    desc += `*Artifact:* ***${relicName}***\n`;
                                    desc += `*Value:*  ***${relicWeight}***\n`;
                                    desc += relicStr;
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.common++;
                            jackpotFish.nextCatch++;
                            jackpotFish.value += (moneyMade/10);
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= baseUncommon && typeOfFish <= 71){
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(uncommonFish, rodLevel)));
                            let weight = generateRandomNumber(uncommonFish[x].lW, uncommonFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xadf40b);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (uncommonFish[x].price * (3 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${uncommonFish[x].fish}**\n`;
                            //-----------------good rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Koi"){
                                fishFound.koi++;
                                if(fishFound.koi <= 5){
                                    desc += `**(${fishFound.koi}/5)** Koi Caught.\n`
                                    if(fishFound.koi == 5){
                                        desc += `**You can now buy the Good Rod**\n`
                                    }
                                }
                            }
                            //-------------------------------------------------------------
    
                            //-----------------great rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Caramel Salmon"){
                                fishFound.carasalmon++;
                                if(fishFound.carasalmon <= 5){
                                    desc += `**(${fishFound.carasalmon}/5)** Caramel Salmon Caught.\n`
                                    if(fishFound.carasalmon == 5){
                                        desc += `**You can now buy the Great Rod**\n`
                                    }
                                }
                            }
                            //-------------------------------------------------------------
    
                            //-----------------super rod capabilities-----------------------
                            if(uncommonFish[x].fish == "Gengarfish"){
                                fishFound.gengarfish++;
                                if(fishFound.gengarfish <= 5){
                                    desc += `**(${fishFound.gengarfish}/5)** Gengarfish Caught.\n`
                                    if(fishFound.gengarfish == 5){
                                        desc += `**You can now buy the Super Rod**\n`
                                    }
                                }
                            }
                            //-------------------------------------------------------------
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            if(uncommonFish[x].fish == "Oxygen Cell (25%)"){
                                desc = `You caught a(n) **${uncommonFish[x].fish}**\n`;
                                userHazmatInfo.oxygencellValue += 25;
                                pregant = 0;
                            }
                            moneyMade += parseFloat(money.toFixed(2));
                            if(uncommonFish[x].fish == "Turtle"){
                                [maybeRelic, relicName, relicWeight, relicStr] = relic(uncommonRelic);
                                if(maybeRelic == 1){
                                    fishEmbed.setColor(0x6002D5);
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += "*Looks like there's something*\n";
                                    desc += "*Shiny attached to the Turtle..*\n"
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += `***PRETTY RARE ARTIFACT***\n`;
                                    desc += `*Artifact:* ***${relicName}***\n`;
                                    desc += `*Value:*  ***${relicWeight}***\n`;
                                    desc += relicStr;
                                }
                            } 
                            jackpotFish.value += (moneyMade/10);
                            fishFound.uncommon++;
                            jackpotFish.nextCatch++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 72 && typeOfFish <= 86){
                            //rare
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rareFish, rodLevel)));
                            let weight = generateRandomNumber(rareFish[x].lW, rareFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0x0b9cf4);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (rareFish[x].price * (6 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${rareFish[x].fish}**\n`;
                            
                             //-----------------ultra rod capabilities-----------------------
                             if(rareFish[x].fish == "Weltfish"){
                                fishFound.weltfish++;
                                if(fishFound.weltfish <= 5){
                                    desc += `**(${fishFound.weltfish}/5)** Weltfish Caught.\n`
                                    if(fishFound.weltfish == 5){
                                        desc += `**You can now buy the Ultra Rod**\n`
                                    }
                                }
                            }
                            //-------------------master rod capabilties--------------------
                            if(rareFish[x].fish == "Lustrous Zephyrfish"){
                                fishFound.lustzephyr++;
                                if(fishFound.lustzephyr <= 5){
                                    desc += `**(${fishFound.lustzephyr}/5)** Lustrous Zephyrfish Caught.\n`
                                    if(fishFound.lustzephyr == 5){
                                        desc += `**You can now buy the Master Rod**\n`
                                    }
                                }
                            }
                            //-------------------------------------------------------------
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            if(rareFish[x].fish == "Oxygen Cell (50%)"){
                                desc = `You caught a(n) **${rareFish[x].fish}**\n`;
                                userHazmatInfo.oxygencellValue += 50;
                            }
                            if(rareFish[x].fish == "Sapphire Gemstonefish"){
                                [maybeRelic, relicName, relicWeight, relicStr] = relic(rareRelic);
                                if(maybeRelic == 1){
                                    fishEmbed.setColor(0x6002D5);
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += "Wait, this fish looks strange... \n";
                                    desc += "Are its eyes made of Sapphire???\n"
                                    desc += "*You carve out one of the eyes.*\n"
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += `***VERY RARE ARTIFACT***\n`;
                                    desc += `*Artifact:* ***${relicName}***\n`;
                                    desc += `*Value:*  ***${relicWeight}***\n`;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    desc += relicStr;
                                }
                            }
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.rare++;
                            jackpotFish.nextCatch++;
                            jackpotFish.value += (moneyMade/10);
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 87 && typeOfFish <= 96){
                            //epic
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(epicFish, rodLevel)));     
                            if(x == 0 && mysteryEgg.hasEgg == 1){
                                x =  Math.floor(generateRandomNumber(1, loopThroughRarity(epicFish, rodLevel)));
                            }     
                            let weight = generateRandomNumber(epicFish[x].lW, epicFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0x9b40f1);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (epicFish[x].price * (10 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${epicFish[x].fish}**\n`;
                            //-------------------------------------------------------
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            if(epicFish[x].fish == "Oxygen Cell (75%)"){
                                desc = `You caught a(n) **${epicFish[x].fish}**\n`;
                                userHazmatInfo.oxygencellValue += 75;
                            }
                            if(epicFish[x].fish == "Hazmat Chestplate"){
                                desc = `You caught a(n) **${epicFish[x].fish}**\n`;
                                userHazmatInfo.chestplate = 1;
                            }
                            if(epicFish[x].fish == "Hazmat Leggings"){
                                desc = `You caught a(n) **${epicFish[x].fish}**\n`;
                                userHazmatInfo.legs = 1;
                            }
                            if(epicFish[x].fish == "Mysterious Egg"){
                                desc = `You obtained a **${epicFish[x].fish}**\n`
                                desc += `Now use */mysteriousegg*\n`;
                                mysteryEgg.hasEgg = 1;
                            }
                            moneyMade += parseFloat(money.toFixed(2));  
                            fishFound.epic++;
                            jackpotFish.nextCatch++;
                            jackpotFish.value += (moneyMade/10);
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 97 && typeOfFish <= 100){
                            //legendary
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(legendaryFish, rodLevel)));
                            let weight = generateRandomNumber(legendaryFish[x].lW, legendaryFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xe58d31);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (legendaryFish[x].price * (25 + (weight * 0.1)));
                            if(legendaryFish[x].fish == "Oxygen Cell (100%)"){ pregant = 0;}
                            if(legendaryFish[x].fish == "Hazmat Helmet"){ pregant = 0; }
                            if(legendaryFish[x].fish == "Hazmat Boots"){ pregant = 0; }
    
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${legendaryFish[x].fish}**\n`;
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){  
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            if(legendaryFish[x].fish == "Oxygen Cell (100%)"){
                                userHazmatInfo.oxygencellValue += 100;
                                desc = `You caught a(n) **${legendaryFish[x].fish}**\n`;
                            }
                            if(legendaryFish[x].fish == "Hazmat Helmet"){
                                desc = `You caught a(n) **${legendaryFish[x].fish}**\n`;
                                userHazmatInfo.helmet = 1;
                            }
                            if(legendaryFish[x].fish == "Hazmat Boots"){
                                desc = `You caught a(n) **${legendaryFish[x].fish}**\n`;
                                userHazmatInfo.boots = 1;
                            }
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.legendary++;
                            jackpotFish.nextCatch++;
                            jackpotFish.value += (moneyMade/10);
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish == 1){
                            //exotic
                            [maybeRelic, relicName, relicWeight, relicStr] = relic(exoticRelic);
                            if(maybeRelic == 1){
                                fishEmbed.setColor(0x6002D5);
                                desc += `***EXTREMELY RARE EXOTIC ARTIFACT!!!!***\n`;
                                desc += `*Artifact:* ***${relicName}***\n`;
                                desc += `*Value:*  ***${relicWeight}***\n`;
                                desc += relicStr;
                            }else{
                                let x = Math.floor(generateRandomNumber(0, loopThroughRarity(exoticFish, rodLevel)));
                                console.log("fish is " + exoticFish[x].name);
                                if(jackpotFish.nextCatch < 250){
                                    console.log("jackpot catch count not exceeded");
                                    x = Math.floor(generateRandomNumber(1, loopThroughRarity(exoticFish, rodLevel)));
                                }
                                let weight = generateRandomNumber(exoticFish[x].lW, exoticFish[x].hW + 0.1).toFixed(1);
                                let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                                let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                                fishEmbed.setColor(0xc5271b);
                                if(exoticFish[x].fish == "Shriraj 'The Dev' M."){ gender = 1; }
                                if(exoticFish[x].fish == "Swimsuit Acheron"){ gender = 2; }
                                [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                    if(mRBool == 1){
                                        desc += mRResult;
                                        desc += '●～●～●～●～●～●～●～●\n';
                                        weight *= mRWeight;
                                        fishEmbed.setColor(0x6ce59d);
                                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                            mysteryEgg.tracker++;
                                        }
                                    }
                                if(exoticFish[x].fish == "Jackpot Fish"){
                                    money = (jackpotFish.value * (weight * 0.1));
                                    if(mRBool == 1){ money *= mRMoney};
                                    fishEmbed.setColor(0xF4D03F);
                                    desc += `You caught the **${exoticFish[x].fish}**\n`;
                                    if(gender == 1){ 
                                        desc += `Gender: **Male**\n`;
                                        money *= 1.2 
                                    }
                                    if(gender == 2){
                                        desc += `Gender: **Female**\n`;
                                        if(pregant == 69){
                                            money *= 50;
                                            desc += `Pregnant: **Yes**\n`
                                        }else{
                                            desc += `Pregnant: **No**\n`
                                        }
                                    }
                                    desc += `Weight: **${weight}** lbs\n`;
                                    moneyMade += parseFloat(money.toFixed(2));
                                    fishFound.exotic++;
                                    jackpotFish.value = 0;
                                    jackpotFish.nextCatch = 0;
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                        mysteryEgg.tracker++;
                                    }
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                        mysteryEgg.tracker++;
                                    }
                                }else{
                                    money = (exoticFish[x].price * (50 + (weight * 0.1)));
                                    if(exoticFish[x].fish == "Attachable Oxygen Tank"){ pregant = 0; }
                                    if(mRBool == 1){ money *= mRMoney};
                                    desc += `You caught a(n) **${exoticFish[x].fish}**\n`;
                                    if(gender == 1){ 
                                        desc += `Gender: **Male**\n`;
                                        money *= 1.2 
                                    }
                                    if(gender == 2){
                                        desc += `Gender: **Female**\n`;
                                        if(pregant == 69){
                                            money *= 50;
                                            desc += `Pregnant: **Yes**\n`
                                        }else{
                                            desc += `Pregnant: **No**\n`
                                        }
                                    }
                                    desc += `Weight: **${weight}** lbs\n`;
                                    if(exoticFish[x].fish == "Attachable Oxygen Tank"){
                                        userHazmatInfo.oxygentank = 1;  
                                        desc = `You caught a(n) **${exoticFish[x].fish}**\n`;
                                    }
                                    moneyMade += parseFloat(money.toFixed(2));
                                    fishFound.exotic++;
                                    jackpotFish.nextCatch++;
                                    jackpotFish.value += (moneyMade/10);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                        mysteryEgg.tracker++;
                                    }
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            }
                        }
                    }else{
                        desc += "🪝\n Nothing fell for it...";
                        skip++;
                    }
//-------------------------------------------------------------------------------------------------------------------
                }else if(area == "ocean"){
                    console.log("in ocean");
                    if(determineFishing(rodLevel)){
                        let hasSH, multiSH;
                        [hasSH, multiSH] = decypher(userArtifacts.shinyHook);
                        if(hasSH == 1){
                            console.log("has artifact");
                            baseCommon -= multiSH;
                            baseUncommon -= multiSH;
                        }
                        typeOfFish = Math.floor(generateRandomNumber(1,101)); //determines rarity of fish   
                        console.log("fish: " + typeOfFish);   
                        if(typeOfFish >= 2 && typeOfFish <= baseCommon){
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(commonOcean, rodLevel)));
                            let weight = generateRandomNumber(commonOcean[x].lW, commonOcean[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xffffff);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                            if(mRBool == 1){
                                desc += mRResult;
                                desc += '●～●～●～●～●～●～●～●\n';
                                weight *= mRWeight;
                                fishEmbed.setColor(0x6ce59d);
                                if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                    mysteryEgg.tracker++;
                                }
                            }
                            money = (commonOcean[x].price * (1 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${commonOcean[x].fish}**\n`;
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.common++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= baseUncommon && typeOfFish <= 71){
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(uncommonOcean, rodLevel)));
                            let weight = generateRandomNumber(uncommonOcean[x].lW, uncommonOcean[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xadf40b);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (uncommonOcean[x].price * (3 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${uncommonOcean[x].fish}**\n`;
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.uncommon++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 72 && typeOfFish <= 86){
                            //rare
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(rareOcean, rodLevel)));
                            let weight = generateRandomNumber(rareOcean[x].lW, rareOcean[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0x0b9cf4);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (rareOcean[x].price * (6 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${rareOcean[x].fish}**\n`;
                             //-----------------ultra rod capabilities-----------------------
                             if(rareOcean[x].fish == "Weltfish"){
                                fishFound.weltfish++;
                                if(fishFound.weltfish <= 5){
                                    desc += `**(${fishFound.weltfish}/5)** Weltfish Caught.\n`
                                    if(fishFound.weltfish == 5){
                                        desc += `**You can now buy the Ultra Rod**\n`
                                    }
                                }
                            }
                            //-------------------master rod capabilties--------------------
                            if(rareOcean[x].fish == "Lustrous Zephyrfish"){
                                fishFound.lustzephyr++;
                                if(fishFound.lustzephyr <= 5){
                                    desc += `**(${fishFound.lustzephyr}/5)** Lustrous Zephyrfish Caught.\n`
                                    if(fishFound.lustzephyr == 5){
                                        desc += `**You can now buy the Master Rod**\n`
                                    }
                                }
                            }
                            //--------------------------------------------------------------
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.rare++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 87 && typeOfFish <= 96){
                            //epic
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(epicOcean, rodLevel)));          
                            let weight = generateRandomNumber(epicOcean[x].lW, epicOcean[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xb49dee);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (epicOcean[x].price * (10 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${epicOcean[x].fish}**\n`;
                            //-------------------champion rod capabilties--------------------
                            if(epicOcean[x].fish == "Milotic"){
                                fishFound.milotic++;
                                if(fishFound.milotic <= 5){
                                    desc += `**(${fishFound.milotic}/5)** Milotic Caught.\n`
                                    if(fishFound.milotic == 5){
                                        desc += `**You can now buy the Champion Rod**\n`
                                    }
                                }
                            }
                            //--------------------------------------------------------------
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            moneyMade += parseFloat(money.toFixed(2));  
                            fishFound.epic++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish >= 97 && typeOfFish <= 100){
                            //legendary
                            let x = Math.floor(generateRandomNumber(0, loopThroughRarity(legendaryOcean, rodLevel)));
                            let weight = generateRandomNumber(legendaryOcean[x].lW, legendaryOcean[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xe58d31);
                            [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                if(mRBool == 1){
                                    desc += mRResult;
                                    desc += '●～●～●～●～●～●～●～●\n';
                                    weight *= mRWeight;
                                    fishEmbed.setColor(0x6ce59d);
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            money = (legendaryOcean[x].price * (25 + (weight * 0.1)));
                            if(mRBool == 1){ money *= mRMoney};
                            desc += `You caught a(n) **${legendaryOcean[x].fish}**\n`;
                            if(gender == 1){ 
                                desc += `Gender: **Male**\n`;
                                money *= 1.2 
                            }
                            if(gender == 2){
                                desc += `Gender: **Female**\n`;
                                if(pregant == 69){
                                    money *= 50;
                                    desc += `Pregnant: **Yes**\n`
                                }else{
                                    desc += `Pregnant: **No**\n`
                                }
                            }
                            desc += `Weight: **${weight}** lbs\n`;
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.legendary++;
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                mysteryEgg.tracker++;
                            }
                        }else if(typeOfFish == 1){
                            //exotic
                            [maybeRelic, relicName, relicWeight, relicStr] = relic(exoticRelic);
                            if(maybeRelic == 1){
                                fishEmbed.setColor(0x6002D5);
                                desc += `***EXTREMELY RARE EXOTIC ARTIFACT!!!!***\n`;
                                desc += `*Artifact:* ***${relicName}***\n`;
                                desc += `*Value:*  ***${relicWeight}***\n`;
                                desc += relicStr;
                            }else{
                                let x = Math.floor(generateRandomNumber(0, loopThroughRarity(exoticOcean, rodLevel)));
                                let weight = generateRandomNumber(exoticOcean[x].lW, exoticOcean[x].hW + 0.1).toFixed(1);
                                let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                                let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                                fishEmbed.setColor(0xc5271b);
                                [mRBool, mRResult, mRMoney, mRWeight] = determineMutation();
                                    if(mRBool == 1){
                                        desc += mRResult;
                                        desc += '●～●～●～●～●～●～●～●\n';
                                        weight *= mRWeight;
                                        fishEmbed.setColor(0x6ce59d);
                                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 2){
                                            mysteryEgg.tracker++;
                                        }
                                    }
                                if(exoticOcean[x].fish == "Treasure Chest"){
                                    gender = 3
                                    money = (50000 * (75 + weight * 0.1));
                                    if(mRBool == 1){ money *= mRMoney};
                                    fishEmbed.setColor(0xF4D03F);
                                    desc += `You caught the **${exoticOcean[x].fish}**\n`;
                                    desc += `Weight: **${weight}** lbs\n`;
                                    moneyMade += parseFloat(money.toFixed(2));
                                    fishFound.exotic++;
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                        mysteryEgg.tracker++;
                                    }
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                        mysteryEgg.tracker++;
                                    }
                                }else{
                                    money = (exoticOcean[x].price * (50 + (weight * 0.1)));
                                    if(mRBool == 1){ money *= mRMoney};
                                    desc += `You caught a(n) **${exoticOcean[x].fish}**\n`;
                                    if(gender == 1){ 
                                        desc += `Gender: **Male**\n`;
                                        money *= 1.2 
                                    }
                                    if(gender == 2){
                                        desc += `Gender: **Female**\n`;
                                        if(pregant == 69){
                                            money *= 50;
                                            desc += `Pregnant: **Yes**\n`
                                        }else{
                                            desc += `Pregnant: **No**\n`
                                        }
                                    }
                                    desc += `Weight: **${weight}** lbs\n`;
                                    moneyMade += parseFloat(money.toFixed(2));
                                    fishFound.exotic++;
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                        mysteryEgg.tracker++;
                                    }
                                    if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                        mysteryEgg.tracker++;
                                    }
                                }
                            }
                        }
                    }else{
                        desc += "🪝\n Nothing fell for it...";
                        skip++;
                    }     
                }
            }
            moneyMade = parseFloat(moneyMade.toFixed(2))
            finalPrice = moneyMade.toLocaleString('en-US') 
            console.log("money from fish: " + moneyMade);
            if(skip == 0){
                fishEmbed.setDescription(`Sell Price: **$${finalPrice}**\n`); 
            }
            return [desc, moneyMade];
        }


        if(interaction.channelId == 1235629520552333374 && fishingRods.fishingRod < 2){ //fish = 1227273573727604848 //lake-azure-haven = 1227330742523269142
            await interaction.editReply(`You do not own a **Super Rod**, please obtain one and then try again.`);
            return;
        }

        let location = "";
        if(interaction.channelId == 1235629520552333374){ //lazuline-ocean 1235629520552333374
            console.log("area = ocean");
            location = "ocean";
        }else if(interaction.channelId == 1227330742523269142){ // testing: 1227366385332654091 lake: 1227330742523269142
            console.log("area = lake");
            location = "lake";
        }else{
            await interaction.editReply(`Please try this command in <#1227330742523269142> or <#1235629520552333374>`);
            return;
        }

        if(rodType == 0){  //basic rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1).toFixed(2)));
            let sellpriceText = sellprice.toLocaleString('en-US');
            console.log("before price: " + sellprice);
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;


                userHazmatInfo.oxygencellValue += dragon;
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 60_000;


        }else if(rodType == 1){ //good rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1.10).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);
                userHazmatInfo.oxygencellValue += dragon;

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 55_000;

        }else if(rodType == 2){ //great rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1.25).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);
                userHazmatInfo.oxygencellValue += dragon;

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 50_000;

        }else if(rodType == 3){ //super rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1.35).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                userHazmatInfo.oxygencellValue += dragon;
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 45_000;

        }else if(rodType == 4){ //ultra rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1.5).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);
                userHazmatInfo.oxygencellValue += dragon;

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 40_000;


        }else if(rodType == 5){ //masters rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 1.75).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);
                userHazmatInfo.oxygencellValue += dragon;

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 35_000;



        }else if(rodType == 6){ //chmapions rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 2).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;


                userHazmatInfo.oxygencellValue += dragon;
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 30_000;



        }else if(rodType == 7){ //king's rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 3).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;


                userHazmatInfo.oxygencellValue += dragon;
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 25_000;



        }else if(rodType == 8){ //legend rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1, location);
            sellprice = (parseFloat((sellprice * 5).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = totalArtifactMulti();
                sellprice *= 1 + extraMulti;
                let dragon = artifact(userArtifacts.dragon);

                let wyvernMoney, wyverntext;
                [wyvernMoney, wyverntext] = wyvernHunt();
                console.log(wyvernMoney);
                console.log(wyverntext);
                sellprice += wyvernMoney;
                text += wyverntext;

                
                userHazmatInfo.oxygencellValue += dragon;
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                fishEmbed.setDescription(`Sell Price: **$${sellpriceText}**\n`); 
            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 20_000;

        }

        fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
        await interaction.editReply({embeds: [fishEmbed]});


        userProfile.lastFishRan = new Date();
        console.log("user balance: " + (userProfile.balance.toFixed(2)));
        console.log("----------------------------")
        userProfile.balance += parseFloat(sellprice);
        await Promise.all([
            cooldown.save(), 
            userProfile.save(), 
            fishFound.save(), 
            fishingRods.save(), 
            userArtifacts.save(), 
            jackpotFish.save(), 
            userHazmatInfo.save(),
            mysteryEgg.save(),
        ]);
    } catch (error) {
        console.log(`Error handling /fish: ${error}`);
    }
},

    data: {
        name: 'fish',
        description: "fish in the lake to catch some fish :)",
    }
}
