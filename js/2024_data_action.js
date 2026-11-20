data_action = [
    {
        title: "Attack",
        optional: "Standard rule",
        icon: "crossed-swords",
        subtitle: "Melee or Ranged Attack",
        description: "Perform an Attack Roll with a Weapon or an Unarmed Strike.",
        reference: "PHB'24, pgs. 12, 361.",
        bullets: [
            "You can either equip or unequip one weapon when you make an attack as part of this action. You do so before or after the attack.",
            "Certain features, such as the <i>Extra Attack</i> feature of the fighter, allow you to make more than one attack with this action. Each of these attacks is a separate roll and may target different creatures. You may move in between these attacks.",
            "When you attack with a light melee weapon, you can use a bonus action to attack with another light melee weapon in your other hand (see the <i>Offhand attack</i> bonus action).",
            "You may use an unarmed strike to <i>Grapple</i>, <i>Shove</i> or deal damage to an opponent. To deal damage, make an attack roll against the target with a bonus of your Strength Modifier plus your Proficiency Bonus and deal (1 + STR Modifier) Bludgeoning damage.",
            "Some conditions give Advantage on the attack: attacks against blinded, paralyzed, petrified, restrained, stunned, or unconscious targets; melee attacks against prone targets; attacks by invisible or hidden attackers.",
            "Some conditions give Disadvantage on the attack: attacks against invisible or hidden targets; ranged attacks against prone targets; attacks by blinded, frightened, poisoned, or restrained attackers."
        ]
    },
    {
        title: "Grapple",
        optional: "Standard rule",
        icon: "grab",
        subtitle: "Special Unarmed Attack",
        description: "Attempt to Grab a Creature or Wrestle with It",
        reference: "PHB'24, pg. 377.",
        bullets: [
            "You can use the <i>Attack</i> action to make a special unarmed attack, a grapple. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.",
            "The target of your grapple must be no more than one size larger than you, and you have to have a hand free to grab the target.",
            "The target must succeed on a Strength or Dexterity saving throw (it chooses which), or it has the <i>Grappled</i> condition. The DC for the saving throw and any escape attempts is 8 + STR Modifier + Proficiency Bonus of the attacker."
        ]
    },
    {
        title: "Shove",
        optional: "Standard rule",
        icon: "hand",
        subtitle: "Special Unarmed Attack",
        description: "Shove a Creature, Either to Knock It Prone or Push It Away From You",
        reference: "PHB'24, pg. 377.",
        bullets: [
            "You can use the <i>Attack</i> action to make a special unarmed attack, a shove. If you're able to make multiple attacks with the Attack action, this attack replaces one of them.",
            "The target of your shove must be no more than one size larger than you.",
            "The target must succeed on a Strength or Dexterity saving throw (it chooses which), or it will either be pushed 5 feet or knocked prone (attacker chooses which). The DC for the saving throw is 8 + STR Modifier + Proficiency Bonus of the attacker."
        ]
    },
    {
        title: "Cast a Spell",
        optional: "Standard rule",
        icon: "magic-swirl",
        subtitle: "Cast Time of 1 Action",
        description: "Cast a Spell with a Casting Time of 1 Action",
        reference: "PHB'24, pg. 235-238, 363.",
        bullets: [
            "On a turn, you can expend only one spell slot to cast a spell. You can't, for example, cast a spell with a spell slot as your action and another one using your bonus action on the same turn.",
            "The target of a spell must be within the spell's range. To target something, you must have a clear path to it, so it can't be behind total cover.",
            "Spells with material components do not consume the material unless explicitly stated. Unless the cost of a material is given, you can assume that the cost is negligible and the material is simply available in a component pouch.",
            "Some spells require you to maintain concentration in order to keep their magic active. If you lose concentration, such a spell ends. You lose concentration on a spell if you cast another spell that requires concentration or when you are incapacitated. Each time you take damage, you must make a Constitution saving throw to maintain your concentration. The DC equals 10 or half the damage you take, whichever number is higher, up to a maximum of 30."
        ]
    },
    {
        title: "Dash",
        optional: "Standard rule",
        icon: "sprint",
        subtitle: "Double Movement Speed",
        description: "Gain Extra Movement for the Current Turn",
        reference: "PHB'24, pg. 365.",
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
        reference: "PHB'24, pg. 366.",
        bullets: [
        ]
    },
    {
        title: "Dodge",
        optional: "Standard rule",
        icon: "aura",
        subtitle: "Increase Defenses",
        description: "Focus Entirely on Avoiding Attacks",
        reference: "PHB'24, pg. 366.",
        bullets: [
            "Until the start of your next turn, any attack roll made against you has Disadvantage if you can see the attacker, and you make Dexterity saving throws with Advantage.",
            "You lose this benefit if you are <i>Incapacitated</i> or if your speed is 0."
        ]
    },
    {
        title: "Escape",
        optional: "Standard rule",
        icon: "manacles",
        subtitle: "Escape a Grapple",
        description: "Escape a Grapple",
        reference: "PHB'24, pg. 367.",
        bullets: [
            "To escape a grapple, you must succeed on a Strength (Athletics) or Dexterity (Acrobatics) check against the grapple's escape DC.",
            "Escaping other conditions that restrain you (such as manacles) may require a Dexterity or Strength check, as specified by the condition."
        ]
    },
    {
        title: "Help",
        optional: "Standard rule",
        icon: "telepathy",
        subtitle: "Grant an Ally Advantage",
        description: "Grant an Ally Advantage on an Ability Check or Attack",
        reference: "PHB'24, pg. 368.",
        bullets: [
            "You can choose one of your skill or tool proficiencies and one ally who is near enough for you to assist verbally or physically when they make an ability check. That ally has Advantage on the next ability check they make with the chosen skill or tool.",
            "Alternatively, you can choose to distract an enemy within 5 feet of you, giving Advantage to the next attack roll against that enemy.",
            "The Advantage expires, if it is not used by the start of your next turn."
        ]
    },
    {
        title: "Utilize",
        optional: "Standard rule",
        icon: "snatch",
        subtitle: "Interact, Use Special Abilities",
        description: "Interact with an Object or Use Special Object Abilities",
        reference: "PHB'24, pg. 377.",
        bullets: [
            "You normally interact with an object while doing something else, such as when you draw a sword as part of the attack action.",
            "When an object requires an action for its use, you take the <i>Utilize</i> action."
        ]
    },
    {
        title: "Use Shield",
        optional: "Standard rule",
        icon: "round-shield",
        subtitle: "Equip or Unequip a Shield",
        description: "Equip or Unequip a Shield",
        reference: "PHB'24, pgs. .",
        bullets: [
            "Shields require the <i>Utilize</i> action to Don or Doff.",
            "Armor takes several minutes to equip or unequip.",
            "You gain the Armor Class benefit of a Shield only if you have training with it."
        ]
    },
    {
        title: "Hide",
        optional: "Standard rule",
        icon: "hood",
        subtitle: "Try to Conceal Yourself",
        description: "Try to Conceal Yourself",
        reference: "PHB'24, pg. 368.",
        bullets: [
            "You must succeed on a DC 15 Dexterity (Stealth) check while you're Heavily Obscured or behind at least Three-Quarters Cover and must be out of any enemy's line of sight.",
            "If you can see a creature, you can discern whether it can see you.",
            "On a successful check, you have the <i>Invisible</i> condition. Make note of your check's total, which is the DC for a creature to find you with a Wisdom (Perception) check.",
            "The condition ends immediately after you make a sound louder than a whisper, an enemy finds you, you make an attack roll or you cast a spell with a Verbal Component."
        ]
    },
    {
        title: "Influence",
        optional: "Standard rule",
        icon: "magnifying-glass",
        subtitle: "Urge a Monster to Do Something.",
        description: "Urge a Monster to Do Something.",
        reference: "PHB'24, pg. 369.",
        bullets: [
            "Describe or roleplay how you're communication with the creature. Trying to deceive, intimidate, amuse or persuade?",
            "Your DM determines if an ability check is necessary."
        ]
    },
    {
        title: "Search",
        optional: "Standard rule",
        icon: "magnifying-glass",
        subtitle: "Discern Something, That Isn't Obvious.",
        description: "Discern Something, That Isn't Obvious.",
        reference: "PHB'24, pg. 373.",
        bullets: [
            "You make a Wisdom check to discern something that isn't obvious.",
            "E.g. Creature's state of mind = Insight, Creature's ailment or cause of death = Medicine, Concealed creature or object = Perception, Tracks or Food = Survival",
            "Your DM may request checks using other Abilities like Intellect."
        ]
    },
    {
        title: "Study",
        optional: "Standard rule",
        icon: "magnifying-glass",
        subtitle: "Study Your Memory, a Book or a Clue.",
        description: "Study Your Memory, a Book or a Clue.",
        reference: "PHB'24, pg. 375.",
        bullets: [
            "You make an intelligence check to study a source of knowledge and call to mind an important piece of information about it."
        ]
    },
    {
        title: "Ready",
        optional: "Standard rule",
        icon: "stopwatch",
        subtitle: "Wait for a Particular Circumstance.",
        description: "Choose a Trigger and a Response Reaction",
        reference: "PHB'24, pg. 372.",
        bullets: [
            "You take the <i>Ready</i> action on your turn, which lets you act by taking a Reaction before the start of your next turn.",
            "Decide, what perceivable circumstance will trigger your Reaction.",
            "Choose the action you will take in response to that trigger, or choose to move up to your Speed in response to it.",
            "When the trigger occurs, you can either take your Reaction right after the trigger finishes or ignore the trigger.",
            "When you ready a spell, you cast it as normal but hold its energy, which you release with your reaction when the trigger occurs. To be readied, a spell must have a casting time of 1 action, and holding onto the spell's magic requires concentration."
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
        subtitle: "Stabilize a Dying Creature.",
        description: "Stop a Dying Creature From Needing to Make Death Saving Throws",
        reference: "PHB'24, pg. 29.",
        bullets: [
            "Make a Wisdom (Medicine) check with DC 10.",
            "On a success, the creature is stable and no longer needs to make death saving throws even though it has 0 Hit Points.",
            "if it takes damage, it stops being stable and has to make death saving throws again.",
            "A stable creature regains 1 hit point after 1d4 hours if it isn't healed."
        ]
    },
    {
        title: "Improvise",
        optional: "Standard rule",
        icon: "juggler",
        subtitle: "Any Action Not on This List",
        description: "Perform Any Action You Can Imagine",
        reference: "PHB'24, pg. 15.",
        bullets: [
            "When you describe an action not detailed elsewhere in the rules, the DM tells you whether that action is possible and what kind of roll you need to make, if any, to determine success or failure."
        ]
    },
    {
        title: "Delay",
        optional: "Homebrew rule",
        icon: "hourglass",
        subtitle: "Change Initiative Order",
        description: "Delay Your Turn to Act Later in the Initiative Order.",
        reference: "Popular 5.5e Homebrew",
        bullets: [
            "Instead of taking your turn, you can choose to Delay. Your initiative permanently changes to a lower number of your choice for the rest of the combat.",
            "You cannot interrupt another creature's turn; you must act immediately after it finishes.",
            "If you do not take your turn before the round ends, you lose your turn for that round.",
            "Effects that end at the 'end of your turn' persist until you actually take your delayed turn, preventing players from exploiting Delay to shed negative conditions early."
        ]
    }
]
