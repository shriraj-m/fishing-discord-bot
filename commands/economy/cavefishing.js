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
    {fish: "Gold Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Anglesite Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Calcite Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Apaite Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Proustite Salmon", price: 10, lW: 2, hW: 30, rod: 0 },
    {fish: "Gold Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Ulexite Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Talc Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Vanadinite Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Sulfur Tuna", price: 8, lW: 10, hW: 50, rod: 0 },
    {fish: "Stolzite Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Gold Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Villiaumite Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Whiterite Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Wulfenite Cod", price: 8, lW: 5, hW: 40, rod: 0 },
    {fish: "Gold Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Anhydrite Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Amber Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Algodonite Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Barite Trout", price: 10, lW: 1, hW: 20, rod: 0 },
    {fish: "Gold Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Barite Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Boleite Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Amber Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Bornite Bass", price: 12, lW: 1, hW: 25, rod: 0 },
    {fish: "Calcite Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Celestite Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Cerussite Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Anhydrite Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Cinnabar Catfish", price: 15, lW: 1, hW: 75, rod: 0 },
    {fish: "Gold Clownfish", price: 15, lW: 1, hW: 25, rod: 0 },
    {fish: "Covellite Clownfish", price: 15, lW: 1, hW: 25, rod: 0 },
    {fish: "Crocoite Clownfish", price: 15, lW: 1, hW: 25, rod: 0 },
    {fish: "Cryolite Clownfish", price: 15, lW: 1, hW: 25, rod: 0 },
    {fish: "Gypsum Clownfish", price: 15, lW: 1, hW: 25, rod: 0 },
    {fish: "Inderite Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Jet Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Kurnakovite Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Kämmererite Candlefish", price: 25, lW: 1, hW: 15, rod: 0 },
    {fish: "Lepidolite Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Gold Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Linarite Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Mellite Combfish", price: 15, lW: 1, hW: 10, rod: 0 },
    {fish: "Gold Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Millerite Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Palygorskite Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Pearl Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Phosgenite Flounder", price: 5, lW: 0.5, hW: 15, rod: 0 },
    {fish: "Phosphophyllite Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Proustite Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Witherite Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Cinnabar Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Whewellite Porgy", price: 10, lW: 0.5, hW: 5, rod: 0 },
    {fish: "Serpentine Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Villiaumite Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Vanadinite Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Ulexite Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Turquoise Asp", price: 20, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Talc Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Serpentine Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Ulexite Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Sulfur Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Stolzite Bonefish", price: 20, lW: 1, hW: 8, rod: 1 },
    {fish: "Ulexite Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Stichtite Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Shortite Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Serpentine Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Cinnabar Leerfish", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Ulexite Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Gold Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Chrysocolla Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Celestite Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
    {fish: "Cerussite Lingcod", price: 30, lW: 1, hW: 10, rod: 2 },
]

const uncommonFish = [
    {fish: "Adamite Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Algodonite Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Ammolite Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Anhydrite Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Apatite Mahi-Mahi", price: 25, lW: 5, hW: 30, rod: 0 },
    {fish: "Apophyllite Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Aragonite Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Augelite Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Celestite Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Canasite Mackerel", price: 20, lW: 0.5, hW: 10, rod: 0 },
    {fish: "Celestite Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Ceruleite Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Charoite Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Chiolite Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Colemanite Snapper", price: 20, lW: 1, hW: 50, rod: 0 },
    {fish: "Creedite Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Cuprite Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Datolite Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Dioptase Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Dolomite Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Ekanite Pike", price: 20, lW: 1, hW: 30, rod: 0 },
    {fish: "Enstatite Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Eosphorite Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Eudialyte Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Flourite Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Hematite Wahoo", price: 25, lW: 10, hW: 50, rod: 0 },
    {fish: "Hemimorphite Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Howlite Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Huebnerite Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Kyanite Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Lapis Lazuli Grouper", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Ludlamite Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Malachite Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Microlite Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Moldavite Barracuda", price: 20, lW: 5, hW: 100, rod: 0 },
    {fish: "Natrolite Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Neptunite Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Obsidian Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Palygorskite Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Papagoite Guppy", price: 35, lW: 0.5, hW: 1, rod: 0 },
    {fish: "Paragasite Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Pectolite Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Prosopite Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Purpurite Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Scheelite Icefish", price: 25, lW: 5, hW: 10, rod: 0 },
    {fish: "Scorodite Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Sellaite Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Serandite Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Serpentine Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Sphene Shattuckite Koi", price: 25, lW: 5, hW: 25, rod: 0 },
    {fish: "Spurrite Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Tektite Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Tremolite Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Variscite Seabass", price: 40, lW: 1, hW: 20, rod: 2 },
    {fish: "Väyrynenite Mangrove Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Wavellite Mangrove Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Weloganite Vermillion Snapper", price: 40, lW: 2, hW: 20, rod: 2 },
    {fish: "Wilkeite Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
    {fish: "Witherite Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
    {fish: "Zincite Spadefish", price: 35, lW: 1, hW: 20, rod: 2 },
]

const rareFish = [
    {fish: "Actinolite Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Albite Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Amblygonite Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Anatase Coelacanth", price: 50, lW: 20, hW: 200, rod: 0 },
    {fish: "Andesine Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Anorthite Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Benitoite Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Beryllonite Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Brazilianite Blobfish", price: 65, lW: 15, hW: 25, rod: 0 },
    {fish: "Canasite Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Catapleiite Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Ceruleite Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Charoite Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Cobaltite Oarfish", price: 45, lW: 10, hW: 600, rod: 0 },
    {fish: "Diopside Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Epidote Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Euxenite Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Haüyne Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Humite Sturgeon", price: 35, lW: 20, hW: 1500, rod: 0 },
    {fish: "Hyperitdiabas Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Idocraase Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Kornerupine Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Kyanite Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Labradorite Bowmouth Guitarfish", price: 50, lW: 50, hW: 300, rod: 0 },
    {fish: "Lapis Lazuli Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Lazulite Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Leucite Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Manganotantalite Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Marcasite Viperfish", price: 40, lW: 10, hW: 25, rod: 0 },
    {fish: "Moonstone Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Nepheline Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Nephrite Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Neptunite Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Opal Pineapplefish", price: 35, lW: 1, hW: 15, rod: 0 },
    {fish: "Pectolite Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Periclase Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Peristerite Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Petalite Rockfish", price: 35, lW: 25, hW: 75, rod: 0 },
    {fish: "Pyrite Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Pyroxmangite Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Rhodonite Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Rutile Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Sanidine Snipefish", price: 35, lW: 1, hW: 2.5, rod: 0 },
    {fish: "Sarcolite Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Scapolite Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Sellaite Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Serandite Surfperch", price: 25, lW: 10, hW: 25, rod: 0 },
    {fish: "Serpentine Scorpionfish", price: 55, lW: 0.5, hW: 5, rod: 1 },
    {fish: "Sodalite Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Titanite Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Sugilite Squid", price: 55, lW: 4, hW: 35, rod: 1 },
    {fish: "Sunstone Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Tantalite Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Tanzanite Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Tektite Tarakihi", price: 45, lW: 1, hW: 15, rod: 1 },
    {fish: "Thomsonite Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Turquoise Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Tremolite Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Xonotlite Arapaima", price: 55, lW: 2, hW: 25, rod: 2 },
    {fish: "Zircon Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Willemite Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Sellaite Giant Grouper", price: 65, lW: 10, hW: 160, rod: 2 },
    {fish: "Scapolite Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Sarcolite Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Rutile Goliath Tigerfish", price: 70, lW: 10, hW: 150, rod: 2 },
    {fish: "Serpentine Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
    {fish: "Xonotlite Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
    {fish: "Zektzerite Zephyrfish", price: 110, lW: 10, hW: 20, rod: 4 },
]

const epicFish = [
    {fish: "Almandine Garnet Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Amethyst Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Ametrine Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Aquamarine Red Handfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Axinite Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Benitoite Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Bloodstone Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Carnelian Mola Mola", price: 30, lW: 220, hW: 2200, rod: 0 },
    {fish: "Bloodstone Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Cassiterite Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Chambersite Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Chrysocolla Devil's Hole Pupfish", price: 100, lW: 1, hW: 6, rod: 0 },
    {fish: "Citrine Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Garnet Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Cordierite Mariana Snailfish", price: 100, lW: 1, hW: 5, rod: 0 },
    {fish: "Diaspore Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Demantoid Garnet Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Emerald Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Euxenite Arcticfish", price: 150, lW: 10, hW: 20, rod: 0 },
    {fish: "Gahnospinel Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Garnet Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Hambergite Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Hematite Meertfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Emerald Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Serpentine Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Iolite Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Japser Glitchfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Humite Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Iolite Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Jasper Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Jeremejevite Lewandowskifish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Kyanite Sl1ckfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Kornerupine Sl1ckfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Labradorite Sl1ckfish", price: 105, lW: 5, hW: 20, rod: 0 },
    {fish: "Laserblue Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Malaya Garnet Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Moonstone Leafy Seadragon", price: 100, lW: 1, hW: 3, rod: 0 },
    {fish: "Onyx Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Opal Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Touramline Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Peridot Northern Sea Robin", price: 125, lW: 15, hW: 35, rod: 0 },
    {fish: "Petalite Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Phenakite Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Pollucite Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Proteus Flying Fish", price: 105, lW: 1, hW: 5, rod: 0 },
    {fish: "Pyrite Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Quartz Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Red Beryl Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Rose Quartz Long-Tail Red Snapper", price: 150, lW: 5, hW: 15, rod: 0 },
    {fish: "Rubellite Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Sapphirine Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Sillimanite Rainbow Runner", price: 120, lW: 10, hW: 15, rod: 0 },
    {fish: "Smoky Quartz Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Spinel Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Spodumene Yellowfin Tuna", price: 120, lW: 4, hW: 20, rod: 1 },
    {fish: "Staurolite Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Sugilite Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Zoisite Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Tiger's Eye Atlantic Sailfish", price: 120, lW: 60, hW: 200, rod: 1 },
    {fish: "Tsavorite Garnet Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Uvarovite Garnet Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Zircon Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
    {fish: "Zunyite Yellowtail Amberjack", price: 150, lW: 10, hW: 100, rod: 2 },
]

const legendaryFish = [
    {fish: "Alexandrite Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Aquamarine Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Chrysoberyl Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Emerald Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Gahnospinel Supanikafish", price: 300, lW: 160, hW: 300, rod: 0 },
    {fish: "Red Beryl Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Spinel Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Taaffeite Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Topaz Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Heliodor Puigufish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Gahnospinel Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Emerald Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Dumortierite Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Painite Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Holtite Vanscoyocfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Painite Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Phenakite Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Rhodizite Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Topaz Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
    {fish: "Alexandrite Tarboxfish", price: 500, lW: 165, hW: 193, rod: 0 },
]

const exoticFish = [
    {fish: "Diamond Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Sapphire Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Serpentine Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Corundum Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Ruby Mandufish", price: 1500, lW: 125, hW: 150, rod: 0 },
    {fish: "Serpentine Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Topaz Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Alexandrite Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Diamond Fishsticks", price: 1100, lW: 7, hW: 7, rod: 0 },
    {fish: "Diamond Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Sapphire Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Serpentine Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Emerald Magikarp", price: 1350, lW: 5, hW: 15, rod: 0 },
    {fish: "Diamond Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Topaz Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Celestite Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Emerald Toskafish", price: 1400, lW: 10, hW: 100, rod: 0 },
    {fish: "Titanium Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Diamond Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Corundum Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Topaz Tequila Splitfish", price: 1300, lW: 5, hW: 20, rod: 0 },
    {fish: "Diamond Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Pink Diamond Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Topaz Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Purple Diamond Arowana", price: 1800, lW: 2, hW: 10, rod: 1 },
    {fish: "Topaz Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    {fish: "Diamond Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    {fish: "Ruby Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },
    {fish: "Sapphire Humuhumunukunukuapua", price: 2000, lW: 5, hW: 20, rod: 1 },

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
    let choice = Math.floor(generateRandomNumber(1,101));
    //0 = default. 1 = good, 2 = great, = 3 super, 4 = ultra, 5 = master, 6 = champion's, 7 = kings rod, 8 = legends, 9 = music's
    if(rodLevel >= 0){ // default 70/30
        if(choice >= 31){
            return true;
        }else{
            return false;
        }
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

        const commandName = "cavefish";
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
        



        if(interaction.channelId != 1231019380855541891){ //fish = 1227273573727604848 //lake-azure-haven = 1227330742523269142
            await interaction.reply({content: `head ove to <#1231019380855541891> to use this command!!! `,
                                    ephemeral: true,});
            return;
        }

        if(interaction.channelId == 1231019380855541891){
            let helmet = userHazmatInfo.helmet;
            let chestplate = userHazmatInfo.chestplate;
            let legs = userHazmatInfo.legs;
            let boots = userHazmatInfo.boots;
            let otank = userHazmatInfo.oxygentank;
            let cellValue = userHazmatInfo.oxygencellValue;

            if(helmet == 0 || chestplate == 0 || legs == 0 || boots == 0 || otank == 0){
                let noHazmatdesc = "";
                noHazmatdesc += 'You do **NOT** have the Sufficient Gear to Access the Mine.\n';
                if(helmet == 0){ noHazmatdesc += 'Missing: **Hazmat Helmet**\n'; }
                if(chestplate == 0){ noHazmatdesc += 'Missing: **Hazmat Chestplate**\n'; }
                if(legs == 0){ noHazmatdesc += 'Missing: **Hazmat Leggings**\n'; }
                if(boots == 0){ noHazmatdesc += 'Missing: **Hazmat Boots**\n'; }
                if(otank == 0){ noHazmatdesc += 'Missing: **Attachable Oxygen Tank**\n'; }
                await interaction.reply({content: noHazmatdesc, ephemeral: true,});
                return;
            }
            if(cellValue/5 < 1){
                await interaction.reply({
                    content: 'You Do **NOT** Have Enough Oxygen. Please Acquire Some and Try Again.',
                    ephemeral: true,});
                return;
            }
        }
        await interaction.deferReply();

        
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
                content: `You can use /cavefish again in **${prettyMs(cooldown.endsAt - Date.now())}**`,
                ephemeral: true,
            });
            return;
        }
        if (!cooldown) {
            cooldown = new Cooldowns({userId, commandName});
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
        let cellValue = userHazmatInfo.oxygencellValue;

        function determineMutation(){
            let mutate = Math.floor(generateRandomNumber(1, 11));
            let typeOfMutation = Math.floor(generateRandomNumber(1,101));
            console.log('mutating: ' + mutate);
            let result = "";
            let multimoney = 1;
            let multiweight = 1;
            if(mutate == 9){ 
                if(typeOfMutation >= 1 && typeOfMutation <= 17){
                    result += "***INFUSION MUTATION***\n";
                    result += "***Variant: Noctrul***\n";
                    multimoney = 8;
                    multiweight = 1;
                }else if(typeOfMutation >= 18 && typeOfMutation <= 34){
                    result += "***INFUSION MUTATION***\n";
                    result += "***Variant: Necrathene***\n";
                    multiweight = 5;
                    multimoney = 5;
                }else if(typeOfMutation >= 35 && typeOfMutation <= 51){
                    result += "***INFUSION MUTATION***\n";
                    result += "***Variant: Zodian***\n";
                    multiweight = 10;
                    multimoney = 2;
                }else if(typeOfMutation >= 52 && typeOfMutation <= 68){
                    result += "***INFUSION MUTATION***\n";
                    result += "***Variant: Xenorhast***\n";
                    multiweight = 5;
                    multimoney = 5;
                }else if(typeOfMutation >= 69 && typeOfMutation <= 85){
                    result += "***INFUSION MUTATION***\n";
                    result += "***Variant: Heciphron***\n";
                    multiweight = 30;
                    multimoney = 1;        
                }else if(typeOfMutation >= 86 && typeOfMutation <= 95){
                    result += "***RARE INFUSION MUTATION***\n";
                    result += "***Variant: Black Diamond***\n";
                    multiweight = 25;
                    multimoney = 7;        
                }else if(typeOfMutation >= 96 && typeOfMutation <= 100){
                    result += "***LEGENDARY INFUSION MUTATION***\n";
                    result += "***Variant: Star Sapphire***\n";
                    multiweight = 5;
                    multimoney = 20;        
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

        function oxygenMessage(sellText){
            if((userHazmatInfo.oxygencellValue/5) < 1){
                fishEmbed.setDescription(`Sell Price: **$${sellText}**\nThat Was Your Final Cast.`); 
            }else{
                fishEmbed.setDescription(`Sell Price: **$${sellText}**\nEnough Oxygen for **${(userHazmatInfo.oxygencellValue/5)}** Casts`); 
            }
        }


        function fishing(typeOfFish, rodLevel, occurance){
            let skip = 0;
            let desc = "";
            let mRResult;
            let mRBool = 0;
            let mRMoney;
            let mRWeight;
            let money = 0;
            let moneyMade = 0;
            let upgradeL = 0;
            let upgradeR = 0;
            let baseCommon = 41;
            let baseUncommon = 42;
            for(let i = 0; i < occurance; i++){
                userHazmatInfo.oxygencellValue -= 5;
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
                        money = (commonFish[x].price * (100 + (weight * 0.1)));
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
                        moneyMade += parseFloat(money.toFixed(2));
                        fishFound.common++;
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
                        money = (uncommonFish[x].price * (150 + (weight * 0.1)));
                        if(mRBool == 1){ money *= mRMoney};
                        desc += `You caught a(n) **${uncommonFish[x].fish}**\n`;
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
                        jackpotFish.value += (moneyMade/10);
                        fishFound.uncommon++;
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
                        money = (rareFish[x].price * (175 + (weight * 0.1)));
                        if(mRBool == 1){ money *= mRMoney};
                        desc += `You caught a(n) **${rareFish[x].fish}**\n`;
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
                        jackpotFish.value += (moneyMade/10);
                        if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                            mysteryEgg.tracker++;
                        }
                    }else if(typeOfFish >= 87 && typeOfFish <= 96){
                        //epic
                        let x = Math.floor(generateRandomNumber(0, loopThroughRarity(epicFish, rodLevel)));          
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
                        money = (epicFish[x].price * (150 + (weight * 0.1)));
                        if(mRBool == 1){ money *= mRMoney};
                        desc += `You caught a(n) **${epicFish[x].fish}**\n`;
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
                        money = (legendaryFish[x].price * (200 + (weight * 0.1)));
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
                        moneyMade += parseFloat(money.toFixed(2));
                        fishFound.legendary++;
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
                            let weight = generateRandomNumber(exoticFish[x].lW, exoticFish[x].hW + 0.1).toFixed(1);
                            let gender = Math.floor(generateRandomNumber(1,3)); //1 = male, 2 = female;
                            let pregant = Math.floor(generateRandomNumber(1,101)); // 1/100 to get insane multiplier
                            fishEmbed.setColor(0xc5271b);
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
                            money = (exoticFish[x].price * (350 + (weight * 0.1)));
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
                            moneyMade += parseFloat(money.toFixed(2));
                            fishFound.exotic++;
                            jackpotFish.value += (moneyMade/10);
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 1){
                                mysteryEgg.tracker++;
                            }
                            if(mysteryEgg.hasEgg == 1 && mysteryEgg.path == 3){
                                mysteryEgg.tracker++;
                            }
                        }
                    }
                }else{
                    desc += "*The radioactive water dissolves your hook...*\n";
                    if((userHazmatInfo.oxygencellValue/5) < 1){
                        fishEmbed.setDescription(`Sell Price: **$${moneyMade}**\nThat Was Your Final Cast.`);  
                    }else{
                        fishEmbed.setDescription(`Enough Oxygen for **${(userHazmatInfo.oxygencellValue/5)}** Cast(s)`); 
                    }
                    skip++;
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

        if(rodType == 0){  //basic rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1).toFixed(2)));
            let sellpriceText = sellprice.toLocaleString('en-US');
            console.log("before price: " + sellprice);
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);
                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 60_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});


        }else if(rodType == 1){ //good rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1.10).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 55_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});

        }else if(rodType == 2){ //great rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1.25).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 50_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});

        }else if(rodType == 3){ //super rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1.35).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 45_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});


        }else if(rodType == 4){ //ultra rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1.5).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 40_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});


        }else if(rodType == 5){ //masters rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 1.75).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 35_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});



        }else if(rodType == 6){ //chmapions rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 2).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 30_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});



        }else if(rodType == 7){ //king's rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 3).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 25_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});



        }else if(rodType == 8){ //legend rod
            [text, sellprice] = fishing(typeOfFish, rodType, 1);
            sellprice = (parseFloat((sellprice * 5).toFixed(2)))
            let sellpriceText = sellprice.toLocaleString('en-US');
            if(sellprice > 0){
                let extraMulti = artifact(userArtifacts.pokerChip);
                extraMulti += artifact(userArtifacts.musicNote);
                extraMulti += artifact(userArtifacts.sapphireGem);

                sellprice *= 1 + extraMulti
                sellpriceText = parseFloat(sellprice.toFixed(2)).toLocaleString('en-US');
                oxygenMessage(sellpriceText);

            }else if(maybeRelic == 1){
                fishEmbed.setDescription(`**ARTIFACT**`);
            }
            cooldown.endsAt = Date.now() + 20_000;
            fishEmbed.addFields({name: '●～●～●～●～●～●～●～●', value: text, inline: true});
            await interaction.editReply({embeds: [fishEmbed]});

        }

        userProfile.lastFishRan = new Date();
        console.log("user balance: " + (userProfile.balance.toFixed(2)));
        console.log("----------------------------")
        userProfile.balance += parseFloat(sellprice);
        await Promise.all([cooldown.save(), userProfile.save(), fishFound.save(), fishingRods.save(), userArtifacts.save(), jackpotFish.save(), userHazmatInfo.save(), mysteryEgg.save()]);
    } catch (error) {
        console.log(`Error handling /cavefishing: ${error}`);
    }
},

    data: {
        name: 'cavefish',
        description: "fish deep in the cave to catch some interesting fish :)",
    }
}
