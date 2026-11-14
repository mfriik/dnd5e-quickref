data_environment_obscurance = [
    {
        title: "Lightly Obscured",
        optional: "Standard rule",
        icon: "bleeding-eye",
        subtitle: "Disadvantage on Perception",
        description: "Dim Light, Patchy Fog, Moderate Foliage",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "Creatures have <b>disadvantage on Wisdom (Perception)</b> checks that rely on sight."
        ]
    },
    {
        title: "Heavily Obscured",
        optional: "Standard rule",
        icon: "lightning-tear",
        subtitle: "Effectively Blind",
        description: "Darkness, Opaque Fog, Dense Foliage",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "A creature in a heavily obscured area effectively suffers from the <b>blinded condition</b>."
        ]
    }
]

data_environment_light = [
    {
        title: "Bright Light",
        optional: "Standard rule",
        icon: "star-pupil",
        subtitle: "Normal Vision",
        description: "Bright Light Lets Most Creatures See Normally",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "Gloomy days still provide bright light, as do torches, lanterns, fires, and other sources of illumination within a specific radius."
        ]
    },
    {
        title: "Dim Light",
        optional: "Standard rule",
        icon: "semi-closed-eye",
        subtitle: "Lightly Obscured",
        description: "Dim Light, Also Called Shadows",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "Creates a <b>lightly obscured</b> area.",
            "An area of dim light is usually a boundary between a source of bright light, such as a torch, and surrounding darkness.",
            "The soft light of twilight and dawn also counts as dim light. A particularly brilliant full moon might bathe the land in dim light."
        ]
    },
    {
        title: "Darkness",
        optional: "Standard rule",
        icon: "worried-eyes",
        subtitle: "Heavily Obscured",
        description: "Darkness Creates a Heavily Obscured Area",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "Creates a <b>heavily obscured</b> area.",
            "Characters face darkness outdoors at night (even most moonlit nights), within the confines of an unlit dungeon or a subterranean vault, or in an area of magical darkness."
        ]
    }
]

data_environment_vision = [
    {
        title: "Blindsight",
        optional: "Standard rule",
        icon: "one-eyed",
        subtitle: "Perceive Without Sight",
        description: "Perceive Your Surroundings Without Relying on Sight, Within a Certain Radius",
        reference: "PHB'14, pg. 183.",
        bullets: [
            "Creatures without eyes, such as oozes, and creatures with echolocation or heightened senses, such as bats and true dragons, have this sense."
        ]
    },
    {
        title: "Darkvision",
        optional: "Standard rule",
        icon: "semi-closed-eye",
        subtitle: "Limited Vision in Darkness",
        description: "A Creature with Darkvision Can See Better in the Dark or Low Light Conditions, Within a Certain Radius",
        reference: "PHB'14, pgs. 183-184.",
        bullets: [
            "Within a specified range, a creature with darkvision can <b>see in darkness as if the darkness were dim light</b>, so areas of darkness are only lightly obscured as far as that creature is concerned.",
            "However, the creature can’t discern color in darkness, only shades of gray.",
            "Many creatures in the worlds of D&D, especially those that dwell underground, have darkvision."
        ]
    },
    {
        title: "Truesight",
        optional: "Standard rule",
        icon: "eye-shield",
        subtitle: "See in Darkness",
        description: "A Creature with Truesight Can See Everything in Its True Form, Independent of the Environment",
        reference: "PHB'14, pg. 184.",
        bullets: [
            "A creature with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceives the original form of a shapechanger or a creature that is transformed by magic.",
            "Furthermore, the creature can see into the Ethereal Plane."
        ]
    }
]

data_environment_cover = [
    {
        title: "Half Cover",
        optional: "Standard rule",
        icon: "broken-shield",
        subtitle: "Low Wall, Furniture, Creatures",
        description: "A Target Has Half Cover If an Obstacle Blocks at Least Half of Its Body",
        reference: "PHB'14, pg. 196.",
        bullets: [
            "The obstacle might be a low wall, a large piece of furniture, a narrow tree trunk, or a creature, whether that creature is an enemy or a friend.",
            "A target with half cover has a <b>+2 bonus to AC and Dexterity saving throws</b>.",
            "If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    },
    {
        title: "Three-Quarters Cover",
        optional: "Standard rule",
        icon: "cracked-shield",
        subtitle: "Portcullis, Arrow Slit",
        description: "A Target Has Three-Quarters Cover If About Three-Quarters of It Is Covered by an Obstacle",
        reference: "PHB'14, pg. 196.",
        bullets: [
            "The obstacle might be a portcullis, an arrow slit, or a thick tree trunk.",
            "A target with three-quarters cover has a <b>+5 bonus to AC and Dexterity saving throws</b>.",
            "If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    },
    {
        title: "Full Cover",
        optional: "Standard rule",
        icon: "shield",
        subtitle: "Completely Concealed",
        description: "A Target Has Total Cover If It Is Completely Concealed by an Obstacle",
        reference: "PHB'14, pg. 196.",
        bullets: [
            "A target with total cover <b>can’t be targeted directly</b> by an attack or a spell, although some spells can reach such a target by including it in an area of effect.",
            "If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    }
]
