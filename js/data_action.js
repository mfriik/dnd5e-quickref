data_action = [
    {
        title: "Attack",
        optional: "Standard rule",
        icon: "crossed-swords",
        subtitle: "Melee or Ranged Attack",
        description: "Perform a Melee or Ranged Attack with Your Weapon",
        reference: "PHB'14, pgs. 192,194-195.",
        bullets: [
            "Certain features, such as the <i>Extra Attack</i> feature of the fighter, allow you to make more than one attack with this action. Each of these attacks is a separate roll and may target different creatures. You may move in between these attacks.",
            "When you attack with a light melee weapon, you can use a bonus action to attack with your other hand (see the <i>Offhand attack</i> bonus action).",
            "You may replace one of your melee attacks with a <i>Grapple</i> or a <i>Shove</i>.",
            "Some conditions give advantage on the attack: attacks against blinded, paralyzed, petrified, restrained, stunned, or unconscious targets; melee attacks against prone targets; attacks by invisible or hidden attackers.",
            "Some conditions give disadvantage on the attack: attacks against invisible or hidden targets; ranged attacks against prone targets; attacks by blinded, frightened, poisoned, or restrained attackers."
        ]
    },
    {
        title: "Grapple",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Special Melee Attack",
        description: "Attempt to Grab a Creature or Wrestle with It",
        reference: "PHB'14, pg. 195.",
        bullets: [
            "You can use the <i>Attack</i> action to make a special melee attack, a grapple. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.",
            "The target of your grapple must be no more than one size larger than you, and it must be within your reach.",
            "Using at least one free hand, you try to seize the target by making a grapple check, a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check (the target chooses the ability to use).",
            "If you succeed, you subject the target to the grappled condition (its speed is set to 0)."
        ]
    },
    {
        title: "Shove",
        optional: "Standard rule",
        icon: "hand",
        subtitle: "Special Melee Attack",
        description: "Shove a Creature, Either to Knock It Prone or Push It Away From You",
        reference: "PHB'14, pg. 195. / DMG, page 272",
        bullets: [
            "Using the <i>Attack</i> action, you can make a special melee attack to shove a creature. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.",
            "The target of your shove must be no more than one size larger than you, and it must be within your reach.",
            "You make a Strength (Athletics) check contested by the target's Strength (Athletics) or Dexterity (Acrobatics) check (the target chooses the ability to use).",
            "If you win the contest, you either knock the target prone or push it 5 feet away from you.",
        ]
    },
    {
        title: "Shove Aside",
        optional: "Optional Official rule",
        icon: "hand",
        subtitle: "Special Melee Attack",
        description: "Shove a Creature, Either to Knock It Prone or Push It Aside From You",
        reference: "PHB'14, pg. 195. / DMG, page 272",
        bullets: [
            "With this option, a creature uses the special shove attack to force a target to the side.",
            "The attacker has disadvantage on its Strength (Athletics) check when it does so.",
            "If that check is successful, the attacker moves the target 5 feet to a different space within its reach."
        ]
    },
    {
        title: "Cast a Spell",
        optional: "Standard rule",
        icon: "magic-swirl",
        subtitle: "Cast Time of 1 Action",
        description: "Cast a Spell with a Casting Time of 1 Action",
        reference: "PHB'14, pg. 192.",
        bullets: [
            "You can't cast a spell with you action and a different spell with your bonus action in the same turn, except if the action is used to cast a cantrip.",
            "The target of a spell must be within the spell's range. To target something, you must have a clear path to it, so it can't be behind total cover.",
            "Spells with material components do not consume the material unless explicitly stated. Unless the cost of a material is given, you can assume that the cost is negligible and the material is simply available in a component pouch.",
            "Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends. You lose concentration on a spell if you cast another spell that requires concentration or when you are incapacitated. Each time you take damage, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher."
        ]
    },
    {
        title: "Dash",
        optional: "Standard rule",
        icon: "sprint",
        subtitle: "Double Movement Speed",
        description: "Gain Extra Movement for the Current Turn",
        reference: "PHB'14, pg. 192.",
        bullets: [
            "The increase equals your speed, after applying any modifiers."
        ]
    },
    {
        title: "Disengage",
        optional: "Standard rule",
        icon: "journey",
        subtitle: "Prevent Opportunity Attacks",
        description: "Your Movement Doesn't Provoke Opportunity Attacks for the Rest of the Turn",
        reference: "PHB'14, pg. 192.",
        bullets: [
        ]
    },
    {
        title: "Dodge",
        optional: "Standard rule",
        icon: "aura",
        subtitle: "Increase Defenses",
        description: "Focus Entirely on Avoiding Attacks",
        reference: "PHB'14, pg. 192.",
        bullets: [
            "Until the start of your next turn, any attack roll made against you has disadvantage if you can see the attacker, and you make Dexterity saving throws with advantage.",
            "You lose this benefit if you are <i>incapacitated</i> or if your speed drops to 0."
        ]
    },
    {
        title: "Escape",
        optional: "Standard rule",
        icon: "manacles",
        subtitle: "Escape a Grapple",
        description: "Escape a Grapple",
        reference: "PHB'14, pg. 195.",
        bullets: [
            "To escape a grapple, you must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check contested by the grappler's Strength (Athletics) check.",
            "Escaping other conditions that restrain you (such as manacles) may require a Dexterity or Strength check, as specified by the condition."
        ]
    },
    {
        title: "Help",
        optional: "Standard rule",
        icon: "telepathy",
        subtitle: "Grant an Ally Advantage",
        description: "Grant an Ally Advantage on an Ability Check or Attack",
        reference: "PHB'14, pg. 192.",
        bullets: [
            "The target gains advantage on the next ability check it makes to perform the task you are helping with.",
            "Alternatively, the target gains advantage on the next attack roll against against a creature within 5 feet of you.",
            "The advantage lasts until the start of your next turn."
        ]
    },
    {
        title: "Use Object",
        optional: "Standard rule",
        icon: "snatch",
        subtitle: "Interact, Use Special Abilities",
        description: "Interact with a Second Object or Use Special Object Abilities",
        reference: "PHB'14, pg. 193.",
        bullets: [
            "You can interact with one object for free during your turn (such as drawing a weapon or opening a door). If you want to interact with a second object, use this action.",
            "When an object requires your action for its use, you also take this action."
        ]
    },
    {
        title: "Use Shield",
        optional: "Standard rule",
        icon: "round-shield",
        subtitle: "Equip or Unequip a Shield",
        description: "Equip or Unequip a Shield",
        reference: "PHB'14, pgs. 144-146.",
        bullets: [
            "A shield always takes an action to equip or unequip.",
            "Armor takes several minutes to equip or unequip."
        ]
    },
    {
        title: "Hide",
        optional: "Standard rule",
        icon: "hood",
        subtitle: "Attempt to Hide",
        description: "Attempt to Hide",
        reference: "PHB'14, pg. 192.",
        bullets: [
            "You can't hide from a creature that can see you. You must have total cover, be in a heavily obscured area, be invisible, or otherwise block the enemy's vision.",
            "If you make noise (such as shouting a warning or knocking over a vase), you give away your position.",
            "When you try to hide, make a Dexterity (Stealth) check and note the result. Until you are discovered or you stop hiding, that check's total is contested by the Wisdom (Perception) check of any creature that actively searches for signs of your presence.",
            "A creature notices you even if it isn't searching unless your Stealth check is higher than its Passive Perception.",
            "Out of combat, you may also use a Dexterity (Stealth) check for acts like concealing yourself from enemies, slinking past guards, slipping away without being noticed, or sneaking up on someone without being seen or heard."
        ]
    },
    {
        title: "Search",
        optional: "Standard rule",
        icon: "magnifying-glass",
        subtitle: "Attempt to Find Something",
        description: "Devote Your Attention to Finding Something",
        reference: "PHB'14, pg. 193.",
        bullets: [
            "Depending on the nature of your search, the DM might have you make a Wisdom (Perception) check or an Intelligence (Investigation) check."
        ]
    },
    {
        title: "Ready",
        optional: "Standard rule",
        icon: "stopwatch",
        subtitle: "Choose Trigger and Action",
        description: "Choose a Trigger and a Response Reaction",
        reference: "PHB'14, pg. 193.",
        bullets: [
            "First, you decide what perceivable circumstance will trigger your reaction.",
            "Then, you choose the action you will take in response to that trigger, or you choose to move up to your speed in response to it.",
            "When the trigger occurs, you can either take your reaction right after the trigger finishes or ignore the trigger.",
            "When you ready a spell, you cast it as normal but hold its energy, which you release with your reaction when the trigger occurs. To be readied, a spell must have a casting time of 1 action, and holding onto the spell's magic requires concentration"
        ]
    },
    {
        title: "Use Class Feature",
        optional: "Standard rule",
        icon: "embrassed-energy",
        subtitle: "Some Features Use Actions",
        description: "Use a Racial or Class Feature That Uses an Action",
        reference: "See class page for more information.",
        bullets: [

        ]
    },
    {
        title: "Stabilize a Creature",
        optional: "Standard rule",
        icon: "first-aid",
        subtitle: "Aid a Dying Creature",
        description: "Stop a Dying Creature From Needing to Make Death Saving Throws",
        reference: "PHB'14, pg. 197.",
        bullets: [
            "Make a Wisdom (Medicine) check with DC 10",
            "On a success, the creature is stable and no longer needs to make death saving throws",
            "A stable creature regains 1 hit point after 1d4 hours"
        ]
    },
    {
        title: "Improvise",
        optional: "Standard rule",
        icon: "juggler",
        subtitle: "Any Action Not on This List",
        description: "Perform Any Action You Can Imagine",
        reference: "PHB'14, pg. 193.",
        bullets: [
            "When you describe an action not detailed elsewhere in the rules, the DM tells you whether that action is possible and what kind of roll you need to make, if any, to determine success or failure."
        ]
    },
    {
        title: "Disarm",
        optional: "Optional Official rule",
        icon: "sword-break",
        subtitle: "Knock Item Out of Enemy's Grasp",
        description: "A Creature Can Use a Weapon Attack to Knock a Weapon or Another Item From a Target's Grasp.",
        reference: "DMG, page 271",
        bullets: [
            "The attacker makes an attack roll contested by the target's Strength (Athletics) check or Dexterity (Acrobatics) check.",
            "If the attacker wins the contest, the attack causes no damage or other ill effect, but the defender drops the item.",
            "The attacker has disadvantage on its attack roll if the target is holding the item with two or more hands.",
            "The target has advantage on its ability check if it is larger than the attacking creature, or disadvantage if it is smaller."

        ]
    },
    {
        title: "Overrun",
        optional: "Optional Official rule",
        icon: "shield-bash",
        subtitle: "Run Through a Hostile Space",
        description: "When a Creature Tries to Move Through a Hostile Creature's Space, the Mover Can Try to Force Its Way Through by Overrunning the Hostile Creature.",
        reference: "DMG, page 272",
        bullets: [
            "As an action, the mover makes a Strength (Athletics) check contested by the hostile creature's Strength (Athletics) check.",
            "The creature attempting the overrun has advantage on this check if it is larger than the hostile creature, or disadvantage if it is smaller.",
            "If the mover wins the contest, it can move through the hostile creature's space once this turn."
        ]
    },
    {
        title: "Tumble",
        optional: "Optional Official rule",
        icon: "tumble",
        subtitle: "Tumble Through a Hostile Space",
        description: "A Creature Can Try to Tumble Through a Hostile Creature's Space, Ducking and Weaving Past the Opponent.",
        reference: "DMG, page 272",
        bullets: [
            "As an action, the tumbler makes a Dexterity (Acrobatics) check contested by the hostile creature's Dexterity (Acrobatics) check.",
            "If the tumbler wins the contest, it can move through the hostile creature's space once this turn."
        ]
    },
    {
        title: "Mark",
        optional: "Optional Official rule",
        icon: "cross-mark",
        subtitle: "Opportunity Attack Advantage",
        description: "This Option Makes It Easier for Melee Combatants to Harry Each Other with Opportunity Attacks.",
        reference: "DMG, page 271",
        bullets: [
            "When a creature makes a melee attack, it can also mark its target.",
            "Until the end of the attacker's next turn, any opportunity attack it makes against the marked target has advantage.",
            "The opportunity attack doesn't expend the attacker's reaction",
            "The attacker can't make the attack if anything, such as the incapacitated condition or the shocking grasp spell, is preventing it from taking reactions.",
            "The attacker is limited to one opportunity attack per turn.",
        ]
    },
    {
        title: "Climb on a Creature",
        optional: "Optional Official rule",
        icon: "mountain-climbing",
        subtitle: "Climb a Bigger Creature",
        description: "If One Creature Wants to Jump Onto Another Creature, It Can Do so by Grappling. A Suitably Large Opponent Can Be Treated as Terrain for the Purpose of Jumping Onto Its Back or Clinging to a Limb.",
        reference: "DMG, page 271",
        bullets: [
            "After making any ability checks necessary to get into position and onto the larger creature, the smaller creature uses its action to make a Strength (Athletics) or Dexterity (Acrobatics) check contested by the target's Dexterity (Acrobatics) check.",
            "If it wins the contest, the smaller creature successfully moves into the target creature's space.",
            "The smaller creature moves with the target and has advantage on attack rolls against it.",
        ]
    },
    {
        title: "Throw a Potion",
        optional: "Homebrew rule",
        icon: "shattered-glass",
        subtitle: "Ranged Improvised Attack",
        description: "Throw a Potion to a Willing Creature to Apply Its Effects at a Distance.",
        reference: "Popular 5e Homebrew",
        bullets: [
            "You can use an Action to throw a potion at a willing creature or a specific 5-foot square within 20 feet of you.",
            "Make a ranged attack roll (Improvised Weapon) against AC 10.",
            "On a hit, the potion shatters and the creature in the targeted space receives the potion's full effect (e.g., healing rolled as normal).",
            "On a miss, the potion shatters on the ground in an adjacent unoccupied space and its magic is wasted."
        ]
    },
    {
        title: "Delay",
        optional: "Homebrew rule",
        icon: "hourglass",
        subtitle: "Change Initiative Order",
        description: "Delay Your Turn to Act Later in the Initiative Order.",
        reference: "Popular 5e Homebrew",
        bullets: [
            "Instead of taking your turn, you can choose to delay. Your initiative permanently changes to a lower number of your choice for the rest of the combat.",
            "You cannot interrupt another creature's turn; you must act immediately after it finishes.",
            "If you do not take your turn before the round ends, you lose your turn for that round.",
            "Effects that end at the 'end of your turn' persist until you actually take your delayed turn, preventing players from exploiting delay to shed negative conditions early."
        ]
    }
]
