data_condition = [
    {
        title: "Blinded",
        optional: "Standard rule",
        icon: "one-eyed",
        subtitle: "No Sight; Attack Disadvantage",
        description: "You Can't See: Sight-Based Checks Fail, Your Attacks Have Disadvantage, and Attacks Against You Have Advantage.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You automatically fail any ability check which requires sight.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage."
        ]
    },
    {
        title: "Charmed",
        optional: "Standard rule",
        icon: "smitten",
        subtitle: "Can't Harm Your Charmer",
        description: "You Can't Attack or Harm Your Charmer with Abilities or Magic. They Have Advantage on Social Checks with You.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You can't attack your charmer or target them with harmful abilities or magical effects.",
            "Your charmer has advantage on ability checks to interact socially with you."
        ]
    },
    {
        title: "Deafened",
        optional: "Standard rule",
        icon: "elf-ear",
        subtitle: "Hearing Checks Fail",
        description: "You Can't Hear and Automatically Fail Ability Checks That Require Hearing.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You automatically fail any ability check which requires hearing."
        ]
    },
    {
        title: "Exhaustion",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Penalties by Level",
        description: "Six Cumulative Levels Impair Checks, Speed, Attacks, Saves, and Maximum Hit Points, Ending in Death at Level 6.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "<table><tr><th>Level</th><th></th><th></th><th style='text-align:left'>Effect</th></tr><tr><td>1</td><td></td><td></td><td>Disadvantage on ability checks</td></tr><tr><td>2</td><td></td><td></td><td>Speed halved</td></tr><tr><td>3</td><td></td><td></td><td>Disadvantage on attack rolls and saving throws</td></tr><tr><td>4</td><td></td><td></td><td>Hit point maximum halved</td></tr><tr><td>5</td><td></td><td></td><td>Speed reduced to 0</td></tr><tr><td>6</td><td></td><td></td><td>Death</td></tr></table>",
            "You suffer the effect of your current level of exhaustion as well as all lower levels.",
            "Finishing a long rest reduces your exhaustion level by 1, provided that you have also had some food and drink.",
            "Also, being raised from the dead reduces a creature’s exhaustion level by 1."
        ]
    },
    {
        title: "Exhaustion (2024)",
        optional: "Homebrew rule",
        icon: "crawl",
        subtitle: "D20 and Speed Penalties",
        description: "Each Level Gives -2 to Ability Checks, Attacks, and Saves, and -5 Ft. Speed; Level 6 Means Death. Replaces 2014 Exhaustion.",
        reference: "PHB'24, pg. 366. Homebrew adaptation for D&D 5e.",
        bullets: [
            "This is an alternative to the standard Exhaustion condition, not an additional set of penalties.",
            "Each Exhaustion level imposes a -2 penalty to D20 Tests (ability checks, attack rolls, and saving throws) and reduces your speed by 5 feet.",
            "<table><tr><th>Level</th><th>D20 Tests</th><th>Speed</th></tr><tr><td>1</td><td>-2</td><td>-5 ft.</td></tr><tr><td>2</td><td>-4</td><td>-10 ft.</td></tr><tr><td>3</td><td>-6</td><td>-15 ft.</td></tr><tr><td>4</td><td>-8</td><td>-20 ft.</td></tr><tr><td>5</td><td>-10</td><td>-25 ft.</td></tr><tr><td>6</td><td colspan='2'>Death</td></tr></table>",
            "Exhaustion levels accumulate. At level 6, you die.",
            "Finishing a long rest reduces your Exhaustion level by 1. At level 0, the condition ends."
        ]
    },
    {
        title: "Frightened",
        optional: "Standard rule",
        icon: "sharp-smile",
        subtitle: "Can't Approach Source",
        description: "You Can't Willingly Approach the Source of Fear. While You Can See It, Your Attacks and Ability Checks Have Disadvantage.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "You have disadvantage on ability checks and attack rolls while the source of your fear is within line of sight.",
            "You can't willingly move closer to the source of your fear."
        ]
    },
    {
        title: "Grappled",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Speed Reduced to 0",
        description: "Your Speed Is 0 and Can't Benefit From Bonuses. The Grapple Ends If the Grappler Is Incapacitated or You Leave Their Reach.",
        reference: "PHB'14, pg. 290.",
        bullets: [
            "Your speed becomes 0, and you can't benefit from any bonus to your speed.",
            "The condition ends if your grappler is incapacitated.",
            "The condition also ends if you are removed from the reach of your grappler."
        ]
    },
    {
        title: "Incapacitated",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "No Actions or Reactions",
        description: "You Can't Take Actions, Bonus Actions, or Reactions.",
        reference: "PHB'14, pg. 290.",
        bullets: [
        ]
    },
    {
        title: "Invisible",
        optional: "Standard rule",
        icon: "invisible",
        subtitle: "Unseen; Attack Advantage",
        description: "You Can't Be Seen Without Magic or Special Senses. Your Attacks Have Advantage; Attacks Against You Have Disadvantage. Noise and Tracks Can Reveal You.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "For the purpose of hiding, you are heavily obscured.",
            "You can still be detected by any noise you make or tracks you leave.",
            "You have advantage on attack rolls.",
            "Attack rolls against you have disadvantage.",
            "A target that's invisble can’t be targeted by a spell requiring sight."
        ]
    },
    {
        title: "Paralyzed",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; Can't Move",
        description: "You Can't Act, Move, or Speak and Fail Strength/Dexterity Saves. Attacks Against You Have Advantage; Hits From Within 5 Ft. Are Critical.",
        bullets: [
            "You are incapacitated and can't move or speak.",
            "Attack rolls against you have advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Petrified",
        optional: "Standard rule",
        icon: "stone-pile",
        subtitle: "Inert; Resist All Damage",
        description: "You and Your Nonmagical Gear Become an Inert Substance. You Can't Act or Move, Fail Strength/Dexterity Saves, and Resist All Damage.",
        reference: "PHB'14, pg. 291.",
        bullets: [
            "Your weight increases by a factor of ten, and you cease aging.",
            "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
            "Attack rolls against you have advantage.",
            "You automatically fail Strength and Dexterity saving throws.",
            "You have resistance to all damage.",
            "You are immune to poison and disease, though a poison or disease already in your system is only suspended, not neutralized."
        ]
    },
    {
        title: "Poisoned",
        optional: "Standard rule",
        icon: "deathcab",
        subtitle: "Attacks & Tests Have Disadvantage",
        description: "Your Attack Rolls and Ability Checks Have Disadvantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You have disadvantage on attack rolls and ability checks."
        ]
    },
    {
        title: "Prone",
        optional: "Standard rule",
        icon: "crawl",
        subtitle: "Crawl; Attack Disadvantage",
        description: "Crawl or Stand up. Your Attacks Have Disadvantage; Attacks Against You Have Advantage From Within 5 Ft., Otherwise Disadvantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "Your only movement option is to crawl, unless you stand up.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage if the attacker is within 5 feet of you, otherwise the attack roll has disadvantage."
        ]
    },
    {
        title: "Restrained",
        optional: "Standard rule",
        icon: "imprisoned",
        subtitle: "Speed 0; Attack Disadvantage",
        description: "Your Speed Is 0. Your Attacks and Dexterity Saves Have Disadvantage; Attacks Against You Have Advantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "Your speed becomes 0, and you can't benefit from any bonus to your speed.",
            "You have disadvantage on attack rolls.",
            "Attack rolls against you have advantage.",
            "You have disadvantage on Dexterity saving throws."
        ]
    },
    {
        title: "Stunned",
        optional: "Standard rule",
        icon: "internal-injury",
        subtitle: "Incapacitated; Can't Move",
        description: "You Can't Act or Move and Can Barely Speak. You Fail Strength/Dexterity Saves; Attacks Against You Have Advantage.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You are incapacitated, can't move, and can speak only falteringly.",
            "Attack rolls against you have advantage.",
            "You automatically fail Strength and Dexterity saving throws."
        ]
    },
    {
        title: "Unconscious",
        optional: "Standard rule",
        icon: "coma",
        subtitle: "Incapacitated; Fall Prone",
        description: "You Can't Act, Move, Speak, or Perceive Your Surroundings. You Fall Prone, Drop Held Items, and Fail Strength/Dexterity Saves. Hits From Within 5 Ft. Are Critical.",
        reference: "PHB'14, pg. 292.",
        bullets: [
            "You are incapacitated, can't move or speak, and are unaware of your surroundings.",
            "You drop whatever you're holding and fall prone.",
            "Attack rolls against you have advantage.",
            "Any attack that hits you is a critical hit if the attacker is within 5 feet of you.",
            "You automatically fail Strength and Dexterity saving throws.",
        ]
    },
    {
        title: "Dying",
        optional: "Standard rule",
        icon: "dead-head",
        subtitle: "0 HP; Make Death Saves",
        description: "At 0 HP and Not Stable, Make Death Saves Each Turn: Three Successes Stabilize You; Three Failures Kill You. Healing Ends Dying.",
        reference: "PHB'14, pg. 197.",
        bullets: [
            "If you are reduced to 0 hit points by damage that fails to kill you, you fall unconscious and are dying.",
            "If you receive any healing you immediately regain consciousness again and no longer dying.",
            "When dying, at the start of each of your turns you make a death saving throw. Roll a d20 and do not add any modifiers.",
            "A 10 or higher is a success, 9 or lower is a failure.",
            "On your third success, you become stable.",
            "On your third failure, you die.",
            "Rolling a 1 counts as two failures.",
            "Rolling a 20 immediately causes you to regain 1 hit point.",
            "You can also be stabilized by an ally taking the Stabilize action and succeeding on a DC 10 Wisdom (Medicine) check.",
            "Once stable, you regain 1 hit point after 1d4 hours."
        ]
    },
    {
        title: "Bleeding",
        optional: "Homebrew rule",
        icon: "open-wound",
        subtitle: "Taking Damage Over Time",
        description: "You Are Losing Blood and Taking Necrotic Damage at the Start of Your Turns.",
        reference: "Popular 5e Homebrew",
        bullets: [
            "At the start of each of your turns, you take 1d4 necrotic damage for each stack of the Bleeding condition you have.",
            "The damage ignores resistance and immunity.",
            "The condition ends if you receive magical healing of any kind.",
            "Alternatively, a creature (including yourself) can use an Action to make a DC 15 Wisdom (Medicine) check, ending the condition on a success."
        ]
    },
    {
        title: "Flanked",
        optional: "Homebrew rule",
        icon: "target-arrows",
        subtitle: "Flankers Gain +2 to Hit",
        description: "Enemies Flanking You Gain +2 to Melee Attack Rolls Against You.",
        reference: "3.5e-Inspired Homebrew for D&D 5e",
        bullets: [
            "You are flanked when at least two enemies allied with each other are adjacent to you and on opposite sides or corners of your space.",
            "A creature can't flank you if it is incapacitated or can't see you.",
            "Instead of granting advantage, flanking grants each flanking creature a flat +2 bonus to melee attack rolls against you.",
            "This bonus stacks with advantage, ensuring that tactical positioning remains valuable even when using spells like Faerie Fire or features like Reckless Attack."
        ]
    }
]
