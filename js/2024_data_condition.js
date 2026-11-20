data_condition = [
    {
        title: "Blinded",
        optional: "Standard rule",
        icon: "one-eyed",
        subtitle: "No Sight; Attack Disadvantage",
        description: "You Can't See: Sight-Based Checks Fail, Your Attacks Have Disadvantage, and Attacks Against You Have Advantage.",
        reference: "PHB'24, pg. 361.",
        bullets: [
            "You automatically fail any ability check that requires sight.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage."
        ]
    },
    {
        title: "Charmed",
        optional: "Standard rule",
        icon: "smitten",
        subtitle: "Can't Harm Your Charmer",
        description: "You Can't Attack or Target Your Charmer with Damaging Abilities or Magic. They Have Advantage on Social Checks with You.",
        reference: "PHB'24, pg. 363.",
        bullets: [
            "You can't attack the charmer or target them with damaging abilities or magical effects.",
            "The charmer has Advantage on ability checks to interact with you socially."
        ]
    },
    {
        title: "Deafened",
        optional: "Standard rule",
        icon: "elf-ear",
        subtitle: "Hearing Checks Fail",
        description: "You Can't Hear and Automatically Fail Ability Checks That Require Hearing.",
        reference: "PHB'24, pg. 365.",
        bullets: [
            "You automatically fail any ability check that requires hearing."
        ]
    },
    {
        title: "Exhaustion",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "D20 and Speed Penalties",
        description: "Each Level Gives -2 to D20 Tests and -5 Ft. Speed. Levels Accumulate; At Level 6, You Die.",
        reference: "PHB'24, pg. 366.",
        bullets: [
            "<table><tr><th>Level</th><th></th><th></th><th style='text-align:left'>D20 Tests</th><th></th><th></th><th>Speed</th></tr><tr><td>1</td><td></td><td></td><td>-2</td><td></td><td></td><td>-5 ft.</td></tr><tr><td>2</td><td></td><td></td><td>-4</td><td></td><td></td><td>-10 ft.</td></tr><tr><td>3</td><td></td><td></td><td>-6</td><td></td><td></td><td>-15 ft.</td></tr><tr><td>4</td><td></td><td></td><td>-8</td><td></td><td></td><td>-20 ft.</td></tr><tr><td>5</td><td></td><td></td><td>-10</td><td></td><td></td><td>-25 ft.</td></tr><tr><td>6</td><td></td><td></td><td>Death</td><td></td><td></td><td>Death</td></tr></table>",
            "This condition is cumulative. Each time you receive it, you gain 1 Exhaustion level. You die if your Exhaustion level is 6.",
            "Finishing a long rest reduces your exhaustion level by 1. When your Exhaustion level reaches 0, the condition ends."
        ]
    },
    {
        title: "Frightened",
        optional: "Standard rule",
        icon: "sharp-smile",
        subtitle: "Can't Approach Source",
        description: "You Can't Willingly Approach the Source of Fear. While You Can See It, Your Attacks and Ability Checks Have Disadvantage.",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "You have Disadvantage on ability checks and attack rolls while the source of fear is within line of sight.",
            "You can't willingly move closer to the source of fear."
        ]
    },
    {
        title: "Grappled",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Speed 0; Limited Attacks",
        description: "Your Speed Is 0. Attacks Against Anyone but the Grappler Have Disadvantage, and the Grappler Can Drag or Carry You.",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "Your speed is 0 and can't increase.",
            "You have Disadvantage on attack rolls against any target other than the grappler.",
            "The grappler can drag or carry you when it moves, but every foot of movement costs 1 extra foot unless you are Tiny or 2 or more sizes smaller."
        ]
    },
    {
        title: "Incapacitated",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "No Actions or Reactions",
        description: "You Can't Take Actions, Bonus Actions, or Reactions, or Speak. Concentration Ends, and Initiative Rolls Have Disadvantage.",
        reference: "PHB'24, pg. 369.",
        bullets: [
            "Your Concentration is broken.",
            "You can't speak.",
            "You have Disadvantage on Initiative rolls."
        ]
    },
    {
        title: "Invisible",
        optional: "Standard rule",
        icon: "invisible",
        subtitle: "Unseen; Attack Advantage",
        description: "You Have Advantage on Initiative. Against Creatures That Can't See You, Your Attacks Have Advantage and Their Attacks Have Disadvantage; Sight-Based Targeting Can't Affect You.",
        reference: "PHB'24, pg. 370.",
        bullets: [
            "You have Advantage on Initiative rolls and attack rolls unless your target can somehow see you.",
            "Attack rolls against you have Disadvantage, unless your attacker can somehow see you",
            "You aren't affected by any effect that requires its target to be seen unless the effect's creator can somehow see you. Any equipment you are wearing or carrying is also concealed."
        ]
    },
    {
        title: "Paralyzed",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; Speed 0",
        description: "You Are Incapacitated, Your Speed Is 0, and You Fail Strength/Dexterity Saves. Attacks Against You Have Advantage; Hits From Within 5 Ft. Are Critical.",
        reference: "PHB'24, pg. 371.",
        bullets: [
            "You have the Incapacitated condition.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage and any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Petrified",
        optional: "Standard rule",
        icon: "stone-pile",
        subtitle: "Inert; Resist All Damage",
        description: "You and Your Nonmagical Gear Become an Inert Substance. You Are Incapacitated with Speed 0, Fail Strength/Dexterity Saves, and Resist All Damage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "Your weight increases by a factor of ten, and you cease aging.",
            "You have the Incapacitated condition.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage.",
            "You automatically fail Strength and Dexterity saving throws.",
            "You have resistance to all damage.",
            "You have Immunity to the Poisoned condition."
        ]
    },
    {
        title: "Poisoned",
        optional: "Standard rule",
        icon: "deathcab",
        subtitle: "Attacks/Checks: Disadvantage",
        description: "Your Attack Rolls and Ability Checks Have Disadvantage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "You have Disadvantage on attack rolls and ability checks."
        ]
    },
    {
        title: "Prone",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Crawl; Attack Disadvantage",
        description: "Crawl or Stand up; You Can't Stand with Speed 0. Your Attacks Have Disadvantage; Attacks Against You Have Advantage From Within 5 Ft., Otherwise Disadvantage.",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "Your only movement option is to crawl, unless you stand up. If your speed is 0, you can't stand up.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage if the attacker is within 5 feet of you, otherwise the attack roll has Disadvantage."
        ]
    },
    {
        title: "Restrained",
        optional: "Standard rule",
        icon: "imprisoned",
        subtitle: "Speed 0; Attack Disadvantage",
        description: "Your Speed Is 0. Your Attacks and Dexterity Saves Have Disadvantage; Attacks Against You Have Advantage.",
        reference: "PHB'24, pg. 373.",
        bullets: [
            "Your speed is 0 and can't increase.",
            "You have Disadvantage on attack rolls.",
            "Attack rolls against you have Advantage.",
            "You have Disadvantage on Dexterity saving throws."
        ]
    },
    {
        title: "Stunned",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Fail STR/DEX Saves",
        description: "You Are Incapacitated and Automatically Fail Strength/Dexterity Saves. Attacks Against You Have Advantage; Stunned Itself Doesn't Reduce Speed.",
        reference: "PHB'24, pg. 376.",
        bullets: [
            "You have the Incapacitated condition.",
            "Attack rolls against you have Advantage.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Unconscious",
        optional: "Standard rule",
        icon: "coma",
        subtitle: "Incapacitated; Fall Prone",
        description: "You Are Incapacitated and Prone with Speed 0, Drop Held Items, and Fail Strength/Dexterity Saves. Attacks Against You Have Advantage; Hits From Within 5 Ft. Are Critical.",
        reference: "PHB'24, pg. 377.",
        bullets: [
            "You have the Incapacitated and Prone conditions and you drop whatever you're holding.",
            "Your speed is 0 and can't increase.",
            "Attack rolls against you have Advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws.",
        ]
    },
    {
        title: "Dying",
        optional: "Standard rule",
        icon: "dead-head",
        subtitle: "0 HP; Make Death Saves",
        description: "At 0 HP and Not Stable, Make Death Saving Throws Each Turn: Three Successes Stabilize You; Three Failures Kill You. Healing Ends Dying.",
        reference: "PHB'24, pg. 197.",
        bullets: [
            "If you are reduced to 0 hit points by damage that fails to kill you, you fall unconscious and are dying.",
            "If you receive any healing you immediately regain consciousness and are no longer dying.",
            "When you start your turn with 0 hit points, you must make a Death Saving Throw without modifiers.",
            "10 or higher is a success, 9 or lower is a failure.",
            "On your third success, you become stable.",
            "On your third failure, you die.",
            "Rolling a 1 counts as two failures.",
            "Rolling a 20 immediately causes you to regain 1 hit point.",
            "If you take damage while dying, you suffer a failure. If it's from a critical hit, you suffer 2 failures.",
            "You can be stabilized by an ally taking the Help (Stabilize) action and succeeding on a DC 10 Wisdom (Medicine) check.",
            "Once stable, you are at 0 HP, still unconcious, but no longer dying. you regain 1 hit point after 1d4 hours if not healed."
        ]
    },
    {
        title: "Dazed",
        optional: "Homebrew rule",
        icon: "pummeled",
        subtitle: "Limited Action Economy",
        description: "You Can Move or Take One Action on Your Turn, Not Both. You Cannot Take Bonus Actions or Reactions.",
        reference: "One D&D Playtest / Homebrew",
        bullets: [
            "You can move or take one Action on your turn, not both.",
            "You cannot take a Bonus Action or a Reaction.",
            "This condition is commonly applied by homebrew monsters and environmental hazards as a less punishing alternative to the Stunned condition, allowing the player to still participate in combat."
        ]
    },
    {
        title: "Flanked",
        optional: "Homebrew rule",
        icon: "target-arrows",
        subtitle: "Flankers Gain +2 to Hit",
        description: "Enemies Flanking You Gain +2 to Melee Attack Rolls Against You.",
        reference: "3.5e-Inspired Homebrew for D&D 5.5e",
        bullets: [
            "You are flanked when at least two enemies allied with each other are adjacent to you and on opposite sides or corners of your space.",
            "A creature can't flank you if it has the Incapacitated condition.",
            "Flanking grants each flanking creature a flat +2 bonus to melee attack rolls against you, rather than Advantage.",
            "This ensures that Weapon Mastery properties (such as Vex) and standard Advantage sources remain mechanically relevant and stack cleanly with tactical positioning."
        ]
    }
]
