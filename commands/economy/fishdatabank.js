
// const commonFish = [
//     {fish: "Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
//     {fish: "Oshawott", price: 10, lW: 10, hW: 20, rod: 0 },
//     {fish: "Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
//     {fish: "Cod", price: 8, lW: 5, hW: 40, rod: 0 },
//     {fish: "Trout", price: 10, lW: 1, hW: 20, rod: 0 },
//     {fish: "Bass", price: 12, lW: 1, hW: 25, rod: 0 },
//     {fish: "Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
//     {fish: "Golden Catfish", price: 80, lW: 5, hW: 120, rod: 0 },
//     {fish: "Clownfish", price: 15, lW: 1, hW: 250, rod: 0 },
//     {fish: "Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
//     {fish: "Rusted Tin Can", price: 1, lW: 0.5, hW: 1, rod: 0 },
//     {fish: "Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
//     {fish: "Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
//     {fish: "Tilapia", price: 5, lW: 0.5, hW: 6, rod: 0 },
//     {fish: "Haddock", price: 10, lW: 2, hW: 10, rod: 0 },
//     {fish: "Darkfish", price: 15, lW: 1, hW: 15, rod: 0 },
//     {fish: "Mishu", price: 15, lW: 10, hW: 15, rod: 0 },
//     {fish: "Dhufish", price: 20, lW: 5, hW: 25, rod: 0 },
//     {fish: "Driftfish", price: 20, lW: 5, hW: 15, rod: 0 },
//     {fish: "Dartfish", price: 15, lW: 1, hW: 5, rod: 0 },
//     {fish: "Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
//     {fish: "Crucian Carp", price: 15, lW: 15, hW: 25, rod: 0 },
//     {fish: "Inverted Clownfish", price: 22, lW: 15, hW: 25, rod: 0 },
//     {fish: "Scalyfin", price: 14, lW: 15, hW: 25, rod: 0 },
//     {fish: "Bitterling", price: 12, lW: 1, hW: 5, rod: 0 },
//     {fish: "Parrotfish", price: 15, lW: 10, hW: 25, rod: 0 },
//     {fish: "Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
//     {fish: "Arctic Char", price: 20, lW: 1, hW: 5, rod: 1 },
//     {fish: "Bluefish", price: 20, lW: 1, hW: 5, rod: 1 },
//     {fish: "Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
//     {fish: "Clown Knife Fish", price: 20, lW: 1, hW: 5, rod: 1 },
//     {fish: "Ironfish", price: 30, lW: 1, hW: 8, rod: 2 },
//     {fish: "Common Ling", price: 30, lW: 2, hW: 5, rod: 2 },
//     {fish: "Crapple", price: 30, lW: 2, hW: 5, rod: 2 },
//     {fish: "Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
//     {fish: "Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
// ]

// const uncommonFish = [
//     {fish: "Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
//     {fish: "Perch", price: 25, lW: 0.1, hW: 5, rod: 0 },
//     {fish: "Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
//     {fish: "Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
//     {fish: "Pike", price: 20, lW: 1, hW: 30, rod: 0 },
//     {fish: "Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
//     {fish: "Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
//     {fish: "Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
//     {fish: "Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
//     {fish: "Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
//     {fish: "Koi", price: 25, lW: 5, hW: 25, rod: 0 },
//     {fish: "Crackfish", price: 24, lW: 15, hW: 25, rod: 0 },
//     {fish: "Fentfish", price: 22, lW: 15, hW: 25, rod: 0 },
//     // {fish: "AR-15", price: 25, lW: 10, hW: 15, rod: 0 },
//     // {fish: "Vandal", price: 25, lW: 10, hW: 15, rod: 0 },
//     {fish: "Kirby", price: 30, lW: 25, hW: 30, rod: 0 },
//     {fish: "Lightfish", price: 25, lW: 1, hW: 10, rod: 0 },
//     {fish: "Marblefish", price: 20, lW: 25, hW: 35, rod: 0 },
//     {fish: "Paddlefish", price: 25, lW: 5, hW: 15, rod: 0 },
//     {fish: "Pearl Perch", price: 30, lW: 1, hW: 15, rod: 1 },
//     {fish: "Queen Snapper (Australian)", price: 30, lW: 1, hW: 10, rod: 1 },
//     {fish: "Queen Snapper (Caribbean)", price: 30, lW: 1, hW: 10, rod: 1 },
//     {fish: "Atlantic Salmon", price: 30, lW: 0.5, hW: 10, rod: 1 },
//     {fish: "Caramel Salmon", price: 50, lW: 1, hW: 20, rod: 1 },
//     {fish: "Gengarfish", price: 80, lW: 1, hW: 20, rod: 2 },
//     {fish: "Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
//     {fish: "Mangrove Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
//     {fish: "Vermillion Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
//     {fish: "Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
// ]

// const rareFish = [
//     {fish: "Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
//     {fish: "Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
//     {fish: "Fortnite Shield Potion", price: 50, lW: 15, hW: 15, rod: 0 },
//     {fish: "Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
//     {fish: "Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
//     {fish: "Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
//     {fish: "Pacific Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
//     {fish: "Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
//     {fish: "Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
//     {fish: "Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
//     {fish: "Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
//     {fish: "Guardian", price: 35, lW: 20, hW: 35, rod: 0 },
//     {fish: "Colfish", price: 32, lW: 15, hW: 45, rod: 0 },
//     {fish: "Dogfish", price: 34, lW: 20, hW: 45, rod: 0 },
//     {fish: "Alligator", price: 30, lW: 25, hW: 45, rod: 0 },
//     {fish: "Sea Gato", price: 35, lW: 8, hW: 16, rod: 0 },
//     {fish: "Gurnard", price: 35, lW: 5, hW: 25, rod: 0 },
//     {fish: "Scorpionfish", price: 55, lW: 0.5, hW: 5, rod: 1 },
//     {fish: "Squid", price: 55, lW: 4, hW: 35, rod: 1 },
//     {fish: "Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
//     {fish: "Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
//     {fish: "Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
//     {fish: "Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
//     {fish: "Weltfish", price: 90, lW: 10, hW: 15, rod: 3 },

// ]

// const epicFish = [
//     {fish: "Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
//     {fish: "Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
//     {fish: "Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
//     {fish: "Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
//     {fish: "Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
//     {fish: "Diamond Catfish", price: 150, lW: 25, hW: 150, rod: 1 },
//     {fish: "Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
//     {fish: "Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
//     {fish: "Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
//     {fish: "Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
//     {fish: "Goldfish (The Species)", price: 105, lW: 1, hW: 5, rod: 0 },
//     {fish: "Goldfish (The Snack)", price: 105, lW: 0.1, hW: 0.1, rod: 0 },
//     {fish: "Elder Guardian", price: 140, lW: 75, hW: 125, rod: 1 },
//     {fish: "Makifish", price: 125, lW: 155, hW: 155, rod: 1 },
//     {fish: "Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
//     {fish: "Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
//     {fish: "Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
//     {fish: "Kanto Kenta Kahuna", price: 145, lW: 60, hW: 280, rod: 2 },
//     // {fish: "Left Double Rod Upgrade1", price: 1, lW: 1, hW: 1, rod: 3 },
//     // {fish: "Right Double Rod Upgrade1", price: 1, lW: 1, hW: 1, rod: 3 },
// ]

// const legendaryFish = [
//     // {fish: "ninjacookie1pt0", price: 125, lW: 40, hW: 100, rod: 0 },
//     {fish: "Narwhal", price: 80, lW: 1500, hW: 2500, rod: 0 },
//     {fish: "Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
//     {fish: "Chaewonfish", price: 500, lW: 93, hW: 93, rod: 1 },
//     {fish: "Yunjinfish", price: 500, lW: 117, hW: 117, rod: 1 },
//     {fish: "Tole Tole", price: 340, lW: 15, hW: 20, rod: 1 },
//     {fish: "Giant Squid", price: 170, lW: 300, hW: 1000, rod: 0 },
//     {fish: "Le-Sunshine", price: 300, lW: 200, hW: 300, rod: 0 },
//     {fish: "Sapphire Catfish", price: 400, lW: 50, hW: 200, rod: 1 },
//     {fish: "Ruby Catfish", price: 400, lW: 45, hW: 200, rod: 1 },
//     {fish: "Emerald Catfish", price: 400, lW: 55, hW: 200, rod: 1 },
//     {fish: "Topaz Catfish", price: 400, lW: 60, hW: 200, rod: 1 },
//     // {fish: "Razer Viper Mini Signature Edition", price: 301, lW: 49, hW: 49, rod: 0 },
//     // {fish: "A Bag of Crackers", price: 450, lW: 15, hW: 60, rod: 0 },
//     // {fish: "Ethan 'Green Bean' P.", price: 500, lW: 165, hW: 193, rod: 0 },
//     // {fish: "Seala", price: 350, lW: 120, hW: 150, rod: 1 },
//     {fish: "Numby", price: 310, lW: 15, hW: 25, rod: 1 },
//     // {fish: "Cockfish", price: 400, lW: 1, hW: 12, rod: 2 },
//     // {fish: "KAY/O", price: 400, lW: 200, hW: 300, rod: 2 },
// ]

// const exoticFish = [
//     // {fish: "Asian Arowana", price: 1000, lW: 2, hW: 10, rod: 0 },
//     {fish: "Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
//     {fish: "Satorufish", price: 1400, lW: 10, hW: 10, rod: 0 },
//     {fish: "Sugurufish", price: 1400, lW: 10, hW: 10, rod: 0 },
//     {fish: "Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
//     {fish: "Blue Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
//     // {fish: "Pink Diamond Catfish", price: 1250, lW: 25, hW: 150, rod: 0 },
//     {fish: "Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
//     {fish: "Platinum Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
//     {fish: "Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
//     // {fish: "Shriraj 'The Dev' M.", price: 5000, lW: 130, hW: 130, rod: 2},
//     {fish: "Swimsuit Acheron", price: 3000, lW: 140, hW: 140, rod: 1},

// ]

// const commonRelic = [
//     {fish: "Music Note", price: 1, lW: 10, hW: 10, rod: 0 },
// ]

// const exoticRelic = [
//     {fish: "Poker Chip", price: 1, lW: 35, hW: 100, rod: 0 },
// ]


// export {commonFish,
//         uncommonFish,
//         rareFish,
//         epicFish,
//         legendaryFish,
//         exoticFish,
//         commonRelic,
//         exoticRelic,
//     };

module.exports = {
    deleted: true,
    run: async ({}) => {
        
        try {
            
        } catch (error) {
            
        }        
    },

    data: {
        disabled: true,
        name: '/fishbank',
        description: 'add',
    }
}