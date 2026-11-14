data_movement = [
    {
        title: "Move",
        optional: "Standard rule",
        icon: "run",
        subtitle: "Cost: 5ft per 5ft",
        description: "Movement Cost: 5ft per 5ft Moved",
        reference: "PHB'24, pg. 24-25, 374.",
        bullets: [
            "If you have more than one speed, such as your walking speed and a flying speed, you can switch back and forth between your speeds during your move. Whenever you switch, subtract the distance you've already moved from the new speed.",
            "You can move through the space of an ally, a creature that has the <i>Incapacitated</i> condition, a Tiny creature or a creature that is two sizes larger or smaller than you.",
            "Another creature's space is difficult terrain for you unless that creature is Tiny or your ally.",
            "You can't willingly end your move in a space occupied by another creature. If you somehow end a turn in a space with another creature, you have the <i>Prone</i> condition, unless you are Tiny or are of a larger size than the other creature."
        ]
    },
    {
        title: "Climb",
        optional: "Standard rule",
        icon: "crags",
        subtitle: "Cost: +5ft per 5ft",
        description: "Movement Cost: Each Foot of Movement Costs 1 Extra Foot",
        reference: "PHB'24, pg. 363.",
        bullets: [
            "Each foot of movement costs 1 extra foot of movement while climbing. If you have a climb speed, you ignore this extra cost.",
            "May involve a Strength (Athletics) check if the climb is difficult."
        ]
    },
    {
        title: "Swim",
        optional: "Standard rule",
        icon: "at-sea",
        subtitle: "Cost: +5ft per 5ft",
        description: "Movement Cost: Each Foot of Movement Costs 1 Extra Foot",
        reference: "PHB'24, pg. 376.",
        bullets: [
            "Each foot of movement costs 1 extra foot of movement while swimming. If you have a swim speed, you ignore this extra cost.",
            "May involve a Strength (Athletics) check if you're swimming in rough waters."
        ]
    },
    {
        title: "Flying",
        optional: "Standard rule",
        icon: "angel-wings",
        subtitle: "Cost: 5ft per 5ft",
        description: "Movement Cost: 5ft per 5ft Flown",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "While you have a fly speed, you can stay aloft until you land, fall or die.",
            "While flying, you fall if you have the <i>Incapacitated</i> or <i>Prone</i> condition or your fly speed is reduced to 0.",
            "You can stay aloft in those circumstances if you can hover."
        ]
    },
    {
        title: "Drop Prone",
        optional: "Standard rule",
        icon: "falling",
        subtitle: "Cost: 0ft",
        description: "Movement Cost: 0ft (Free)",
        reference: "PHB'24, pgs. 25, 372.",
        bullets: [
            "You can drop prone without using any of your speed.",
            "To move while prone, you must crawl or use magic such as teleportation",
            "Dropping prone adds the <i>Prone</i> condition."
        ]
    },
    {
        title: "Crawl",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Cost: +5ft per 5ft",
        description: "Movement Cost: Each Foot of Movement Costs 1 Extra Foot",
        reference: "PHB'24, pg. 364.",
        bullets: [
            "Each foot of movement costs 1 extra foot of movement while crawling."
        ]
    },
    {
        title: "Stand Up",
        optional: "Standard rule",
        icon: "strong",
        subtitle: "Cost: Half Movement Speed",
        description: "Movement Cost: Half of Your Speed, Rounded Down.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "You can't stand up if you don't have enough movement left or if your speed is 0"
        ]
    },
    {
        title: "High Jump",
        optional: "Standard rule",
        icon: "wingfoot",
        subtitle: "Cost: 5ft",
        description: "Movement Cost: 5ft per 5ft Jumped",
        reference: "PHB'24, pg. 368.",
        bullets: [
            "You leap into the air a number of feet equal to <b>3 + your Strength modifier</b> if you move at least 10 feet on foot immediately before the jump.",
            "When you make a standing high jump, you can jump only half that distance.",
            "You can extend your arms half your height above yourself during the jump. Thus, you can reach a distance equal to the height of the jump plus 1.5 times your height.",
            "In some circumstances, your DM might allow you to make a Strength (Athletics) check to jump higher than you normally can."
        ]
    },
    {
        title: "Long Jump",
        optional: "Standard rule",
        icon: "wingfoot",
        subtitle: "Cost: 5ft per 5ft",
        description: "Movement Cost: 5ft per 5ft Jumped",
        reference: "PHB'24, pg. 370.",
        bullets: [
            "You cover a number of feet up to your <b>Strength score</b> if you move at least 10 feet on foot immediately before the jump.",
            "When you make a standing long jump, you can leap only half that distance",
            "If you land in difficult terrain, you must succeed on a DC 10 Dexterity (Acrobatics) check or have the <i>Prone</i> condition.",
            "May involve a DC 10 Strength (Athletics) check to clear a low obstacle (no taller than a quarter of the jump's distance). You hit the obstacle on a failed check."
        ]
    },
    {
        title: "Improvise",
        optional: "Standard rule",
        icon: "juggler",
        subtitle: "Any Stunt Not on This List",
        description: "Perform Any Movement or Stunt You Can Imagine",
        bullets: [
            "When you describe a kind of movement not detailed elsewhere in the rules, the DM tells you whether it is possible and what kind of roll you need to make, if any, to determine success or failure."
        ]
    },
    {
        title: "Difficult Terrain",
        optional: "Standard rule",
        icon: "stone-pile",
        subtitle: "Cost Modifier: +5ft per 5ft",
        reference: "PHB'24, pg. 25, 366.",
        description: "Moving in Difficult Terrain Costs an Additional 5ft per 5ft of Movement",
        bullets: [
            "Every foot of movement costs 1 extra foot.",
            "Difficult terrain isn't cumulative; either a space is difficult terrain or it isn't."
        ]
    },
    {
        title: "Grapple Move",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Cost: +5ft per 5ft",
        description: "Drag or Carry the Grappled Creature with You",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "If you move while grappling another creature, every foot of movement costs 1 extra foot unless the grappled creature is Tiny or you are two or more sizes larger than it."
        ]
    },
    {
        title: "Travel Pace",
        optional: "Standard rule",
        icon: "run",
        subtitle: "Traveling Outside of Combat",
        description: "Travel Pace for Fast, Normal and Slow Travel Outside of Combat.",
        reference: "PHB'24, pg. 20",
        bullets: [
            "Establish a marching order while you travel.",
            "<table><tr><th style='text-align:left'>Pace</th><th></th><th></th><th>Minute</th><th></th><th></th><th>Hour</th><th></th><th></th><th>Day</th></tr><tr><td>Fast</td><td></td><td></td><td>400 feet</td><td></td><td></td><td>4 miles</td><td></td><td></td><td>30 miles</td></tr><tr><td>Normal</td><td></td><td></td><td>300 feet</td><td></td><td></td><td>3 miles</td><td></td><td></td><td>24 miles</td></tr><tr><td>Slow</td><td></td><td></td><td>200 feet</td><td></td><td></td><td>2 miles</td><td></td><td></td><td>18 miles</td></tr></table>",
            "<b>Fast Travel</b> imposes Disadvantage on a traveler's Wisdom (Perception or Survival) and Dexterity (Stealth) checks.",
            "<b>Normal Travel</b> imposes Disadvantage on Dexterity (Stealth) checks.",
            "<b>Slow Travel</b> grants Advantage on Wisdom (Perception or Survival) checks.",
            "Travelers in wagons, carriages or other land vehicles choose a pace as normal. Characters in a waterborne vessel are limited to the speed of the vessel and don't choose a pace."
        ]
    }
]
