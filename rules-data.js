/* DW2 Beta v3 summaries adapted from Charles Blanche's Nocturne Beta. */
window.ARCANUM_RULES = {
  "RULES": {
    "Barbarian": {
      "name": "Barbarian",
      "hp": 12,
      "startingMove": "Rage!",
      "startingDescription": "Enter a rage: mark Angry to gain increased damage and resilience, balanced by restrictions.",
      "statsRule": {
        "locked": {
          "STR": 2
        },
        "choose": [
          "WIS",
          "CHA"
        ],
        "chosen": 2,
        "remaining": [
          0,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Ancestral longsword",
            "1d6 #close; shield (1 use)"
          ],
          [
            "Bloodstained greataxe",
            "1d8 #close #two-handed #forceful"
          ],
          [
            "Dual hammers",
            "1d6 #close #light; damage advantage"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Hearty feast (1 use)",
          "Potion of healing (1 use)",
          "Provisions (3 uses)",
          "Trap kit (2 uses)"
        ]
      },
      "paths": [
        {
          "id": "berserker",
          "name": "Berserker",
          "starter": {
            "id": "trance-like-fury",
            "name": "Trance-Like Fury",
            "hint": "Gain the Rage! Barbarian Starting Move. If you already have Rage! then you get the following additional benefits and penalties: •Add your str to your armor •When you calm down, mark an additional Condition •When you Trade Blows, you…",
            "roll": null,
            "reference_page": 3
          },
          "moves": [
            {
              "id": "red-nails",
              "name": "Red Nails",
              "hint": "Once per session, when you become Bloodied (your HP reaches half or less), clear a Condition. While Bloodied, increase all dmg you deal by 1. When you deal dmg to a Bloodied foe, it’s",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "spine-chilling-countenance",
              "name": "Spine-Chilling Countenance",
              "hint": "You can Pull Strings+STR by physically overpowering or manhandling them. If you do and they go back on their word later, gain adv the next Move you roll against",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "the-beast-within",
              "name": "The Beast Within",
              "hint": "When you unleash the beast inside while Angry, you shapeshift into a hybrid form between yours and one of following animals: •Bear. You Resist mundane weapons and fire •Boar. You Resist fear, terror, and intimidation, even from…",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "when-it-earns-me",
              "name": "When It Earns Me",
              "hint": "When you Face Death while Angry, you may also choose the option below. •Spit in Death’s Face. Recover all HP and you don’t become Helpless. Don’t lock a Condition either. When you do, lose access to this Move until you gain it as an…",
              "roll": null,
              "reference_page": 3
            }
          ]
        },
        {
          "id": "hedonist",
          "name": "Hedonist",
          "starter": {
            "id": "herculean-appetite",
            "name": "Herculean Appetite",
            "hint": "You have a grand and terrible need that pushes you to greater heights and deeper depths. Say what it is now. Appetite: ____________________________________________ Examples include: fame and glory, mortal pleasures, power over others,…",
            "roll": null,
            "reference_page": 3
          },
          "moves": [
            {
              "id": "basking-in-victory",
              "name": "Basking in Victory",
              "hint": "When you satiate an appetite to the extreme (destroy something precious, gain enormous fame, mountains of riches, etc.), in addition to clearing Unsatisfied, choose two: • Clear an additional Condition • Gain 1 Depth with a PC that…",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "forthright-speech",
              "name": "Forthright Speech",
              "hint": "When you smash through social etiquette to call something what it really is, roll+cha. ✴On a 10+, name someone here who agrees and is willing to help, and clear a Condition. ✴On a 7-9, you find an ally or clear a Condition (your…",
              "roll": "CHA",
              "reference_page": 3
            },
            {
              "id": "insatiable",
              "name": "Insatiable",
              "hint": "You have a second appetite. What is it? Did you always have it? While you’re Unsatisfied, you only need to pursue one of your appetites to not suffer its penalty. When you look to satisfy your appetite, tell the GM which one before…",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "strong-as-a-bull",
              "name": "Strong As a Bull",
              "hint": "When you strain yourself to break free of a restraint or compulsion (physical or mental), you can mark a Condition to automatically",
              "roll": null,
              "reference_page": 3
            }
          ]
        },
        {
          "id": "outlander",
          "name": "Outlander",
          "starter": {
            "id": "where-i-come-from",
            "name": "Where I Come From…",
            "hint": "When you tell someone a new story from your homeland (or about its practices, stories, traditions, etc.), mark and answer a question below and clear a Condition. When all five are marked, gain 1 XP and clear all questions. What…",
            "roll": null,
            "reference_page": 3
          },
          "moves": [
            {
              "id": "pack-reader",
              "name": "Pack Reader",
              "hint": "When you Sense the Motive of a group of people, you may ask an extra question below, no matter the roll. •What recent event still troubles or excites them? •Who have they outcast recently, and where can I find them? •Who is hiding a…",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "sacrificial-rite",
              "name": "Sacrificial Rite",
              "hint": "When you ritually sacrifice something significant to your homeland’s wardens (be it ancestors, deities, spirits, totem, etc.), roll+WIS. ✴On a 10+, gain all three. ✴On a 7-9, choose two. • Ask the GM a question about an enemy; they’ll…",
              "roll": "WIS",
              "reference_page": 3
            },
            {
              "id": "tread-the-jeweled",
              "name": "Tread the Jeweled",
              "hint": "When you Sense the Motive of someone more powerful than you (politically, physically, economically, etc.), you may always also ask them “How can I best ruin or humiliate you?”. When you accomplish it, mark 1 XP and clear a",
              "roll": null,
              "reference_page": 3
            },
            {
              "id": "unerring-intuition",
              "name": "Unerring Intuition",
              "hint": "When you arrive at a place you haven’t visited before, roll+WIS. ✴On a 10+, the GM will tell you what’s terribly wrong here; ask a follow-up question and gain adv to the first Move you roll when acting on the answer. ✴On a 7-9, as a…",
              "roll": "WIS",
              "reference_page": 3
            }
          ]
        }
      ]
    },
    "Bard": {
      "name": "Bard",
      "hp": 8,
      "startingMove": "Perform Your Art",
      "startingDescription": "Perform your art and roll +CHA; choose audience effects based on the outcome.",
      "statsRule": {
        "locked": {
          "CHA": 2
        },
        "choose": [
          "DEX",
          "INT"
        ],
        "chosen": 1,
        "remaining": [
          1,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Noble’s crossbow",
            "1d8 #ammo #near #far #precise #piercing #reload #two-handed"
          ],
          [
            "Sword cane",
            "1d6 #concealed #hand #precise #two-handed"
          ],
          [
            "Decorated longsword",
            "1d6 #hand; buckler (1 use)"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Artistic samples (2 uses)",
          "Bag of books (3 uses)",
          "Fine delicacies (1 use)",
          "Provisions (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "dabbler",
          "name": "Dabbler",
          "starter": {
            "id": "bardic-lore",
            "name": "Bardic Lore",
            "hint": "You’ve studied a variety of arcane subjects, including:  A Bestiary of Creatures Most Unusual  Gods and Their Servants  Grand Histories of the Known World  Legends of Heroes Past  Spells and Magicks  The Dead and Undead  The Planar…",
            "roll": null,
            "reference_page": 5
          },
          "moves": [
            {
              "id": "a-kind-of-magic",
              "name": "A Kind of Magic",
              "hint": "You can Cast a Spell+INT by combining a verb and a substance from the Wizard’s Enchantment (substance: sapient beings; verbs: modify emotions; temporarily charm) or Illusion (substance: sight and/or sounds; verbs: cloak; disguise)…",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "a-knave-a-rascal",
              "name": "A Knave, a Rascal",
              "hint": "You get access to the following Roguish Skills: • climb walls • detect noises • pick pockets • understand languages. When you Defy Danger or Sneak Past using one of your Roguish Skills, you may roll+INT (instead of another",
              "roll": "INT",
              "reference_page": 5
            },
            {
              "id": "artisan-s-apprentice",
              "name": "Artisan’s Apprentice",
              "hint": "Gain the Perform Your Art Starting Move from the Bard Class. If you already have Perform Your Art, you gain a second artistic skill. When you Perform Your Art by showcasing both artistic skills together, make an additional choice (no…",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "virtuoso-s-mind",
              "name": "Virtuoso’s Mind",
              "hint": "You can have up to two Bardic Lore subjects active at a time. When you ask the GM a question about an active subject, instead of them answering you may choose to Spout Lore with adv. ✴On a 12+, you may answer (instead of the",
              "roll": null,
              "reference_page": 5
            }
          ]
        },
        {
          "id": "diplomat",
          "name": "Diplomat",
          "starter": {
            "id": "the-oldest-game",
            "name": "The Oldest Game",
            "hint": "When you accomplish a significant task for a relevant NPC (GM’s call), now you hold a Debt against them. While you hold a Debt over someone: • Treat any 6- when you Pull Strings on them as a 7-9 • You can always ask them “What do you…",
            "roll": null,
            "reference_page": 5
          },
          "moves": [
            {
              "id": "cards-on-the-table",
              "name": "Cards on the Table",
              "hint": "When you reveal your true intentions to a foe or stranger, you may ask them a number of questions from the list below, up to your cha (min 1). They will answer honestly, but ask a question back from the list in return each time. At…",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "countercharm",
              "name": "Countercharm",
              "hint": "When you try to impede a mind-influencing effect, roll+CHA. ✴On a 10+, it doesn’t affect you or your allies. ✴On a 7-9, you or your allies are unaffected (your call). ✴On a 6-, it’s beyond your ken; mark 1 XP and the GM makes a Move.…",
              "roll": "CHA",
              "reference_page": 5
            },
            {
              "id": "friends-in-high-places",
              "name": "Friends in High Places",
              "hint": "When you seek the help of a relevant NPC, roll+CHA. If you owe them a favor (your call) or hold a Debt against them, roll with adv. ✴On a 10+, they’re free and able to help. ✴On a 7-9, they’re in trouble and can’t help until that’s…",
              "roll": "CHA",
              "reference_page": 5
            },
            {
              "id": "parley",
              "name": "Parley",
              "hint": "When you call for a truce or ceasefire, roll+CHA. If you know what all parties want (or you hold a Debt against them), roll with adv. ✴On a 10+, hostilities pause and you get a chance to negotiate; you can also ask them one question…",
              "roll": "CHA",
              "reference_page": 5
            }
          ]
        },
        {
          "id": "swashbuckler",
          "name": "Swashbuckler",
          "starter": {
            "id": "style-is-everything",
            "name": "Style is Everything",
            "hint": "Once per Scene, when you do something in an unnecessarily dramatic manner, you may mark a Condition to reset Panache to equal your cha. While you have Panache, when you Trade Blows using a #precise weapon, you can roll+CHA (instead of…",
            "roll": "CHA",
            "reference_page": 5
          },
          "moves": [
            {
              "id": "fly-into-the-face-of-danger",
              "name": "Fly Into the Face of Danger",
              "hint": "When you Defy Danger by attempting something you’ve never tried before, after the roll you may spend 1 Panache to treat a 6- as if it were 7-9, or a 7-9 as if it were a",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "am-not-left-handed",
              "name": "Am Not Left-Handed!",
              "hint": "When you Trade Blows, after you roll you can spend 1 Panache to do one of the following: •Disarm — ✴On a 10+, you can make your opponent drop something they’re holding (instead of the other choices) •Feint — #pierce your opponent’s…",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "very-intricate-backstory",
              "name": "Very Intricate Backstory",
              "hint": "You can have two Struggles active at the same time. Now or the next time you Make Camp, clear a locked Condition (if possible) or Level Up and Reveal a",
              "roll": null,
              "reference_page": 5
            },
            {
              "id": "watch-me-shine",
              "name": "Watch Me Shine",
              "hint": "When​ ​you​ ​draw attention by doing something unnecessarily dramatic, you may spend 1 Panache​ to ​roll+DEX.​ ​✴On​ ​a​ ​10+,​ ​ choose two.​ ​✴On​ ​a​ ​7-9,​ ​only one: •Defuse​ ​or​ ​intensify​ ​a​ ​situation (your call) •Your​…",
              "roll": "DEX",
              "reference_page": 5
            }
          ]
        }
      ]
    },
    "Cleric": {
      "name": "Cleric",
      "hp": 8,
      "startingMove": "Invoke the Divine",
      "startingDescription": "Invoke your deity through a domain and roll +WIS for effects; define the deity and commitments.",
      "statsRule": {
        "locked": {
          "WIS": 2
        },
        "choose": [
          "STR",
          "CHA"
        ],
        "chosen": 1,
        "remaining": [
          1,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Consecrated mace",
            "1d6 #hand; shield (1 use)"
          ],
          [
            "Plain quarterstaff",
            "1d6 #close #hand #two-handed"
          ],
          [
            "Reinforced net",
            "0 #close #hand; trap (1 use)"
          ]
        ],
        "items": [
          "Holy water vials (3 uses)",
          "Leather armor (1 armor, STR+1)",
          "Medicine (2 uses)",
          "Potion of healing (1 use)",
          "Provisions (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "caregiver",
          "name": "Caregiver",
          "starter": {
            "id": "the-greatest-miracle",
            "name": "The Greatest Miracle",
            "hint": "Gain the Invoke the Divine Cleric Starting Move if you don’t already have it, except your deity’s domain is Life. Choose your deity’s worshippers and enemies as detailed in the Move. If you already have Invoke the Divine, add Life to…",
            "roll": null,
            "reference_page": 7
          },
          "moves": [
            {
              "id": "awake-the-shadow-is-gone",
              "name": "Awake! The Shadow Is Gone",
              "hint": "When someone else Faces Death in your presence, you may parley with Death and grant the other PC access to the following option: •Revivified — You’re no longer Helpless and you recover half your max HP. You still lock a Condition…",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "i-ll-carry-it-for-you",
              "name": "I’ll Carry It For You",
              "hint": "When you touch someone else and offer yourself as a sacrifice, erase 1 Depth with your deity then do either or both: •Choose any Conditions they have; they clear those Conditions, and you mark them •Choose any amount of HP they are…",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "face-of-an-angel",
              "name": "Face of an Angel",
              "hint": "No one will attack you directly and unprovoked, unless they’ve seen you fight or have a score to settle. When you Pull Strings, you get access to the following approach: •If you implore them to turn away from violence, they might…",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "mass-cure-wounds",
              "name": "Mass Cure Wounds",
              "hint": "When you proclaim your faith, erase 1 Depth with your deity to restore half of your and your #close allies maximum HP (rounded",
              "roll": null,
              "reference_page": 7
            }
          ]
        },
        {
          "id": "oracle",
          "name": "Oracle",
          "starter": {
            "id": "visions-from-above",
            "name": "Visions From Above",
            "hint": "Gain the Invoke the Divine Cleric Starting Move if you don’t already have it, except your deity’s domain is Knowledge. Choose your deity’s worshippers and enemies as detailed in the Move. If you already have Invoke the Divine, add…",
            "roll": null,
            "reference_page": 7
          },
          "moves": [
            {
              "id": "a-moth-to-the-sacred-flame",
              "name": "A Moth to the Sacred Flame",
              "hint": "When you willingly expose yourself to an enemy attack, roll+cha; if you’re vulnerable while doing so, roll with adv. ✴On a 10+, they boast and babble at you, and you can ask any two questions about them or their superiors. ✴On a 7-9,…",
              "roll": "CHA",
              "reference_page": 7
            },
            {
              "id": "haruspication",
              "name": "Haruspication",
              "hint": "When you ritually sacrifice something important, ask your deity one question about your sacrifice or something associated with it (owners, loved ones, history, etc.), and roll+WIS. ✴On a 10+, your deity shows you a vivid vision that…",
              "roll": "WIS",
              "reference_page": 7
            },
            {
              "id": "sacred-truth",
              "name": "Sacred Truth",
              "hint": "Once per session, when you publicly reveal the truth about a secret or mystery, gain 1 Depth with your deity. If someone present doesn’t want it known, you also gain adv on your next rolled Move against",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "true-colors",
              "name": "True Colors",
              "hint": "When you Sense Motive, you can also ask one of the following questions, even on a 6-. • What are your true feelings about me? • What do you not want to admit (to me, to another, to yourself, etc.)? • Who or what do you care for most…",
              "roll": null,
              "reference_page": 7
            }
          ]
        },
        {
          "id": "warpriest",
          "name": "Warpriest",
          "starter": {
            "id": "punishment-divine",
            "name": "Punishment Divine",
            "hint": "Gain the Invoke the Divine Cleric Starting Move if you don’t already have it, except your deity’s domain is War. Choose your deity’s worshippers and enemies as detailed in the Move. If you already have Invoke the Divine, add War to…",
            "roll": null,
            "reference_page": 7
          },
          "moves": [
            {
              "id": "divine-intuition",
              "name": "Divine Intuition",
              "hint": "When you encounter an enemy of your deity, you may ask the GM questions about it equal to your wis. You get adv on your first roll related to the",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "drink-from-the-cup-of-wrath",
              "name": "Drink from the Cup of Wrath",
              "hint": "When you condemn someone for their evil ways, instead of gaining 1 Depth with your deity, you may make the condemned an enemy of your deity (if they aren’t already). When you petition your deity to harm or curse a collective enemy…",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "not-the-end",
              "name": "Not the End",
              "hint": "When you Face Death, you can also choose the following option: •Divine Intervention. Your deity miraculously saves your life, banishes a danger, enemy or obstacle, then restores all your HP. You’re no longer helpless. You still lock a…",
              "roll": null,
              "reference_page": 7
            },
            {
              "id": "spiritual-weapon",
              "name": "Spiritual Weapon",
              "hint": "When you shout your deity’s name like a battle cry, their power fills any weapon you wield until the end of the scene. Choose one blessing below, or erase 1 Depth with your deity to choose two. • Add +1 to all dmg it deals • It…",
              "roll": null,
              "reference_page": 7
            }
          ]
        }
      ]
    },
    "Druid": {
      "name": "Druid",
      "hp": 8,
      "startingMove": "Shapeshift",
      "startingDescription": "Assume beast forms and roll +WIS to gain a selected adaptation.",
      "statsRule": {
        "locked": {
          "WIS": 2
        },
        "choose": [
          "DEX",
          "CHA"
        ],
        "chosen": 2,
        "remaining": [
          0,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Flowering staff",
            "1d4 #close #two-handed (2 uses)"
          ],
          [
            "Vine slingshot",
            "1d6 #near #ammo #two-handed"
          ],
          [
            "Wooden club",
            "1d6 #close; shield (1 use)"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Alchemical vials (3 uses)",
          "Medicine (2 uses)",
          "Potion of healing (1 use)",
          "Provisions (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "animist",
          "name": "Animist",
          "starter": {
            "id": "anima-mundi",
            "name": "Anima Mundi",
            "hint": "You have an especially close connection with the elemental spirits of the world—the roots, rocks, winds, waters, and more—and they see you as a guardian, caretaker, and ambassador. You can Cast a Spell by entreating natural spirits…",
            "roll": null,
            "reference_page": 9
          },
          "moves": [
            {
              "id": "back-to-basics",
              "name": "Back to Basics",
              "hint": "When you reveal a new flaw or failure of civilization to one or more NPCs, clear a Condition, then roll+CHA. ✴On a 10+, choose two below. ✴On a 7-9, only one. ✴On a 6-, you draw an enemy’s attention; mark 1 XP and the GM makes a Move.…",
              "roll": "CHA",
              "reference_page": 9
            },
            {
              "id": "commune-with-nature",
              "name": "Commune with Nature",
              "hint": "When you spend time connecting with the natural spirits, ask one question below about the region you’re in, or ask all of them but mark a Condition after hearing the answers. The GM will answer honestly. • Does anything here threaten…",
              "roll": null,
              "reference_page": 9
            },
            {
              "id": "death-regrowth",
              "name": "Death & Regrowth",
              "hint": "When you finish off a significant enemy, or when you suffer max dmg, gain 1 Lifeforce (max 2). You can spend Lifeforce as if it was a use of",
              "roll": null,
              "reference_page": 9
            },
            {
              "id": "eye-of-the-storm",
              "name": "Eye of the Storm",
              "hint": "When you Cast a Spell by entreating natural spirits for aid, if all three questions are answered “Yes”, you can treat the mag as if it were 1 lower when comparing it to your Casting",
              "roll": null,
              "reference_page": 9
            }
          ]
        },
        {
          "id": "stargazer",
          "name": "Stargazer",
          "starter": {
            "id": "eye-in-the-sky",
            "name": "Eye in the Sky",
            "hint": "You have a special connection to the sun(s), moon(s), and stars. You always know the time and date, and can never get lost while you can see the sky. While outside during the day, ignore dis from being Frightened and gain +1 Armor.…",
            "roll": null,
            "reference_page": 9
          },
          "moves": [
            {
              "id": "augury",
              "name": "Augury",
              "hint": "When you read the future written in the stars, you can focus your reading on a specific place or person; roll+WIS, then the GM reveals an important event that will happen soon. ✴On a 10+, you may ask a follow-up question. ✴On a 7-9,…",
              "roll": "WIS",
              "reference_page": 9
            },
            {
              "id": "doomsayer",
              "name": "Doomsayer",
              "hint": "When you proclaim an enemy’s imminent fate to them, roll+WIS. ✴On a 10+, choose two. ✴On a 7-9, only one. ✴On a 6-, you only see their success; mark 1 XP and gain dis against them until the end of the scene. •Pain — Increase dmg they…",
              "roll": "WIS",
              "reference_page": 9
            },
            {
              "id": "forecaster",
              "name": "Forecaster",
              "hint": "After you successfully Make Camp, choose what the weather is like from the list below. It remains like this until someone changes it, you use this Move again, or you depart from the region. You and all companions gain the weather’s…",
              "roll": null,
              "reference_page": 9
            },
            {
              "id": "scion-of-sunrise-and-sunset",
              "name": "Scion of Sunrise and Sunset",
              "hint": "When outside during dawn or dusk, gain Eye in the Sky’s daytime and nighttime benefits. When you focus on your connection to the celestial bodies, you may mark a Condition to treat this scene as if it takes place outdoors during dawn…",
              "roll": null,
              "reference_page": 9
            }
          ]
        },
        {
          "id": "wildheart",
          "name": "Wildheart",
          "starter": {
            "id": "primeval-whisperer",
            "name": "Primeval Whisperer",
            "hint": "You can communicate freely with wild creatures. When you Sense the Motive of a wild creature, no matter the result you may ask them an extra question, even on a ✴6-. When you Pull the Strings of a wild creature, if your approach…",
            "roll": null,
            "reference_page": 9
          },
          "moves": [
            {
              "id": "call-of-the-wild",
              "name": "Call of the Wild",
              "hint": "When you call out to the wilderness for aid, choose a suitable type of wild creature for your current environment and roll+CHA. ✴On a 7+, that wild creature arrives to help you for the scene as an allied NPC. ✴On a 10+, choose two.…",
              "roll": "CHA",
              "reference_page": 9
            },
            {
              "id": "raised-by-wolves",
              "name": "Raised by Wolves",
              "hint": "Choose one type of wild creature (e.g. bears, eagles, wolves). By default, they treat you as a friend and your companions as allies by association. When you spend time with your chosen wild creature, choose one if alone or two if with…",
              "roll": null,
              "reference_page": 9
            },
            {
              "id": "rumour-from-the-earth",
              "name": "Rumour From the Earth",
              "hint": "When you Unearth Secrets or Sense Motive by questioning nearby wild creatures, you may",
              "roll": null,
              "reference_page": 9
            },
            {
              "id": "together-as-one",
              "name": "Together as One",
              "hint": "When you mark a wild creature with blood, mud, or dirt, erase previous marks, then you can share in their senses as if they were yours (and vice versa), no matter what distance separates",
              "roll": null,
              "reference_page": 9
            }
          ]
        }
      ]
    },
    "Fighter": {
      "name": "Fighter",
      "hp": 10,
      "startingMove": "Signature Weapon",
      "startingDescription": "Choose a signature weapon and two enhancements; its unique properties grow with advancement.",
      "statsRule": {
        "locked": {},
        "choose": [
          "STR",
          "DEX"
        ],
        "chosen": 2,
        "other": 1,
        "remaining": [
          1,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Intimidating greataxe",
            "1d8 #hand #two-handed"
          ],
          [
            "Twin shortswords",
            "1d6 #hand #light #precise; damage advantage"
          ],
          [
            "Yew longbow",
            "1d6 #ammo #near #far #reload #two-handed"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Breastplate (2 armor, STR+2)",
          "Studded leather (1 armor, STR+1)",
          "Medicine (2 uses)",
          "Provisions (3 uses)",
          "Shield (1 use)"
        ]
      },
      "paths": [
        {
          "id": "bulwark",
          "name": "Bulwark",
          "starter": {
            "id": "stalwart-protector",
            "name": "Stalwart Protector",
            "hint": "Once per session, when you suffer dmg that isn’t #piercing, you may ignore it entirely. If the dmg came from an enemy, also choose one: • They leave themselves open and exposed • You learn a weakness or limitation of theirs • You…",
            "roll": null,
            "reference_page": 11
          },
          "moves": [
            {
              "id": "armiger",
              "name": "Armiger",
              "hint": "You know how to customize your armor and bring the best out of it. Choose one enhancement now:  #concealed (it looks and sounds like mundane clothing)  reinforced (increase the dmg reduction by 1)  spiked (when a foe deals dmg to you,…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "second-wind",
              "name": "Second Wind",
              "hint": "When you Face Death, you also have access to the following option: •Not as Bad As It Looks. Grit your teeth, force yourself through the pain, and get back up with 1 HP. You’re no longer Helpless and you don’t lock a Condition, but you…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "silent-protector",
              "name": "Silent Protector",
              "hint": "When a combat situation begins, choose an ally (PC or NPC) #near you and gain the following benefits until the battle ends: •Retaliate. When they get hurt for 2 or more dmg, gain adv on your next roll against the dmg source •Watchful…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "taunting-shout",
              "name": "Taunting Shout",
              "hint": "When you cry out a challenge to your enemies, name one among them. For now, they will ignore your allies and treat you as the most obvious",
              "roll": null,
              "reference_page": 11
            }
          ]
        },
        {
          "id": "weaponmaster",
          "name": "Weaponmaster",
          "starter": {
            "id": "the-blade-reforged",
            "name": "The Blade Reforged",
            "hint": "Gain a Signature Weapon, following the Fighter’s Starting Move of the same name. If you already have a Signature Weapon, either give it two more enhancements or gain a second Signature Weapon. When you Enjoy Downtime, you may also do…",
            "roll": null,
            "reference_page": 11
          },
          "moves": [
            {
              "id": "advanced-fighting-styles",
              "name": "Advanced Fighting Styles",
              "hint": "You’ve mastered an especially difficult or obscure fighting style. Choose one below: Might of Arms. You can comfortably wield #two-handed melee weapons in one hand, and even dual-wield them Point Blank. All ranged weapons you wield…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "boot-knife",
              "name": "Boot Knife",
              "hint": "Any weapon that isn’t #two-handed can be easily #concealed by you. Gain a set of adventuring gear (even if you already have one). You may mark a use of adventuring gear to withdraw a mundane weapon; mark an additional use if the…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "secret-weapon",
              "name": "Secret Weapon",
              "hint": "The Hand That Wields — When you Trade Blows with an ordinary weapon, or no weapon at all, ✴on a 10+, you may instead choose to clear a Condition and, ✴on a 6-, mark 2 XP instead of 1. When you finally draw your Signature Weapon after…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "snap-the-blade",
              "name": "Snap the Blade",
              "hint": "When you inflict dmg with a weapon, after the dmg roll you may temporarily break the weapon (if it isn’t indestructible) to instead deal max dmg. The weapon becomes nearly useless until repaired. When you Make Camp, you may repair one…",
              "roll": null,
              "reference_page": 11
            }
          ]
        },
        {
          "id": "tactician",
          "name": "Tactician",
          "starter": {
            "id": "plans-within-plans",
            "name": "Plans Within Plans",
            "hint": "When you enter a combat situation, gain Prep equal to your int (min 1). When the combat situation ends, lose all Prep. During the combat situation, you can spend 1 Prep to execute one of the following stratagems: •Charge! — You and…",
            "roll": null,
            "reference_page": 11
          },
          "moves": [
            {
              "id": "eye-for-destruction",
              "name": "Eye for Destruction",
              "hint": "When you set your mind to destroying something (building, obstacle, magical artifact, etc.), treat it like Perform a Ritual. If this is during a combat situation, you can spend Prep, 1-for-1, to negate a requirement, except for the…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "honed-instincts",
              "name": "Honed Instincts",
              "hint": "When you get a bad feeling about an upcoming situation (your call), mark a Condition then ask the GM how to avoid or prepare for it. Whether or not your hunch is right, the GM will give you one piece of advice; clear a Condition if…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "old-comrades-former-foes",
              "name": "Old Comrades & Former Foes",
              "hint": "When you go looking for someone from a past battle, friend or foe, choose one from the following list—or two if you owe them or put them at risk (your call): • They’re willing to assist you with a current conflict • They offer…",
              "roll": null,
              "reference_page": 11
            },
            {
              "id": "veteran-of-a-hundred-battles",
              "name": "Veteran of a Hundred Battles",
              "hint": "When you reach 0 Prep, you may mark a Condition to regain 1 Prep. What past situation does this remind you of? Additionally, add the following stratagems to your Plans Within Plans: •Demoralize — A Bloodied foe surrenders or flees…",
              "roll": null,
              "reference_page": 11
            }
          ]
        }
      ]
    },
    "Paladin": {
      "name": "Paladin",
      "hp": 10,
      "startingMove": "Oaths of Conviction",
      "startingDescription": "Swear and uphold the five oaths, each granting a benefit until broken.",
      "statsRule": {
        "locked": {
          "CHA": 2
        },
        "choose": [
          "STR",
          "WIS"
        ],
        "chosen": 2,
        "remaining": [
          0,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Bloodied warhammer",
            "1d8 #close #two-handed #forceful"
          ],
          [
            "Silver-bolt crossbow",
            "1d8 #ammo #near #far #reload #two-handed"
          ],
          [
            "Liege’s longsword",
            "1d6 #close; shield (1 use)"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Half plate (2 armor, STR+2)",
          "Javelins (1d4 #ammo #near #thrown)",
          "Potion of healing (1 use)",
          "Provisions (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "inquisitor",
          "name": "Inquisitor",
          "starter": {
            "id": "beware-my-power",
            "name": "Beware My Power",
            "hint": "If you don’t have it, gain the Oaths of Conviction Paladin Starting Move, but with only the oath below. If you already have that Move, add this oath as well: Castigation (Never allow an evildoer to live). When you Trade Blows with a…",
            "roll": null,
            "reference_page": 13
          },
          "moves": [
            {
              "id": "by-the-power-invested-in-me",
              "name": "By the Power Invested in Me…",
              "hint": "When you give an NPC an order based on your authority, roll+STR. ✴On a 10+, they follow your order and you get adv to your next Move rolled against them. ✴On a 7-9, they choose one: • Back away cautiously, then flee • Consult with…",
              "roll": "STR",
              "reference_page": 13
            },
            {
              "id": "mystical-imprisonment",
              "name": "Mystical Imprisonment",
              "hint": "When you name an evildoer and order them to stop, magical chains appear and bind them; roll+STR. ✴On a 10+, choose two below. ✴On a 7-9, only one. • It lasts longer than a few moments • They can’t move • They can’t speak or cast…",
              "roll": "STR",
              "reference_page": 13
            },
            {
              "id": "nomosmancy",
              "name": "Nomosmancy",
              "hint": "You can Cast a Spell+STR to impose Order and deny a supernatural effect. When you do so, your unique ✴7-9 option is: •You get a supernatural stain; you can’t use this Move until you Make",
              "roll": null,
              "reference_page": 13
            },
            {
              "id": "public-condemnation",
              "name": "Public Condemnation",
              "hint": "When you proclaim someone to be an evildoer to the public, roll+STR. ✴On a 10+, choose two from the list below. ✴On a 7-9, only one: • They will hunt the evildoer down for you as a group • They will protect you from the evildoer • You…",
              "roll": "STR",
              "reference_page": 13
            }
          ]
        },
        {
          "id": "paragon",
          "name": "Paragon",
          "starter": {
            "id": "safeguard-the-helpless",
            "name": "Safeguard the Helpless",
            "hint": "If you don’t have it, gain the Oaths of Conviction Paladin Starting Move, but with only the Protection oath. If you already have that oath, its benefits also stop foes from #piercing your armor. Hold the Line — When a #near NPC…",
            "roll": null,
            "reference_page": 13
          },
          "moves": [
            {
              "id": "a-shot-at-redemption",
              "name": "A Shot at Redemption",
              "hint": "When you offer a defeated foe an opportunity to change their ways, offer them proof of your sincerity and roll+CHA. ✴On a 10+, they’ll make their best attempt at it. ✴On a 7-9, they’re interested but will need constant monitoring and…",
              "roll": "CHA",
              "reference_page": 13
            },
            {
              "id": "for-the-honor-of",
              "name": "“For the Honor of…”",
              "hint": "Once per session, when you assume a heroic form related to your Origins, choose benefits from below up to your CHA, which last until you Face Death, Reach Your Limit, or the scene ends, whichever happens first. • All allies who…",
              "roll": null,
              "reference_page": 13
            },
            {
              "id": "inspiring-presence",
              "name": "Inspiring Presence",
              "hint": "When you rally your allies with a show of commitment, roll+CHA. ✴On a 10+, they all clear a Condition. ✴On a 7-9, you can mark a Condition so up to your CHA of them clear a Condition. ✴On a 6-, your action is ignored; mark 1 XP and…",
              "roll": "CHA",
              "reference_page": 13
            },
            {
              "id": "you-will-not-break-me",
              "name": "You Will Not Break Me",
              "hint": "When you Reach Your Limit, you may also choose from the options below. If you do, you only clear up to CHA Conditions, but may mark 1 Depth with a PC who helped you: •Angry — Make a show of force or lash out at your foes •Distracted —…",
              "roll": null,
              "reference_page": 13
            }
          ]
        },
        {
          "id": "questing-knight",
          "name": "Questing Knight",
          "starter": {
            "id": "on-a-mission",
            "name": "On a Mission",
            "hint": "When you dedicate yourself to a quest for your liege, describe it. If you already have a quest, erase it and mark a Condition. Then mark blessings up to your WIS. They remain while you stay true to your quest, and can be changed when…",
            "roll": null,
            "reference_page": 13
          },
          "moves": [
            {
              "id": "i-dub-thee",
              "name": "I Dub Thee…",
              "hint": "When you Face Death, you may also choose the following: •Newly Knighted. Name a PC, say why you believe in them, then die. If they accept, they gain this Path beyond normal",
              "roll": null,
              "reference_page": 13
            },
            {
              "id": "the-great-uniter",
              "name": "The Great Uniter",
              "hint": "When you try to join or ally with a faction, or request assistance from your liege, if they aren’t your direct foes they’ll tell you of a big problem or goal they’re grappling with. If you help them resolve it, you earn their loyalty,…",
              "roll": null,
              "reference_page": 13
            },
            {
              "id": "throw-down-the-gauntlet",
              "name": "Throw Down the Gauntlet",
              "hint": "When you demand a one-on-one duel in response to an insult, your opponent cannot decline, but they can use a substitute, propose provisions, or add complications (GM’s call). Additionally, whenever you begin the duel, clear Conditions…",
              "roll": null,
              "reference_page": 13
            },
            {
              "id": "trusted-squire",
              "name": "Trusted Squire",
              "hint": "You have a young NPC at your service who carries your belongings, tends to your needs, and is learning to fight (1d4 dmg). When they suffer harm, mark a Condition. Once per session, when you teach them a lesson, Defy Danger+WIS. ✴On a…",
              "roll": null,
              "reference_page": 13
            }
          ]
        }
      ]
    },
    "Ranger": {
      "name": "Ranger",
      "hp": 10,
      "startingMove": "Animal Companion",
      "startingDescription": "Choose and customize an animal companion; its qualities influence how it helps.",
      "statsRule": {
        "locked": {
          "DEX": 2
        },
        "choose": [
          "STR",
          "INT"
        ],
        "chosen": 2,
        "remaining": [
          0,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Composite bow",
            "1d6 #near #far #ammo #two-handed"
          ],
          [
            "Dual scimitars",
            "1d6 #hand #light #precise; damage advantage"
          ],
          [
            "Staff and sling",
            "1d6 #hand #close; sling 1d4 #near #ammo"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Light armor (1 armor, STR+1)",
          "Medicine (2 uses)",
          "Provisions (3 uses)",
          "Trap kit (2 uses)"
        ]
      },
      "paths": [
        {
          "id": "beastmaster",
          "name": "Beastmaster",
          "starter": {
            "id": "no-mere-creature",
            "name": "No Mere Creature",
            "hint": "Gain the Animal Companion Ranger Starting Move if you don’t already have it. If you already have it, instead choose two additional Qualities for your Companion. Either way, choose and mark one Special Training below. When you Make…",
            "roll": null,
            "reference_page": 15
          },
          "moves": [
            {
              "id": "in-this-together",
              "name": "In This Together",
              "hint": "When you retrain your animal companion, you can also change their Drawback. After you help your animal companion work on their Drawback, gain 1 Loyalty (max 3). You may spend Loyalty to gain an unmarked Special Training until the end…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "kindred-spirits",
              "name": "Kindred Spirits",
              "hint": "When you Make Camp, your animal companion clears one of your Conditions (your choice). Emotional Support — Choose a Condition now; ignore its penalties while your animal companion is with you. You may change the chosen Condition when…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "superior-companion",
              "name": "Superior Companion",
              "hint": "Your animal companion can have two Special Trainings (instead of one), and can also choose from the following: Distraction — When you Sneak Past, after you roll you may send your companion away to draw attention, increasing the result…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "warbeast",
              "name": "Warbeast",
              "hint": "When your animal companion helps you to fight, increase the added armor to 2, and the added dmg to 1d6. Once per scene, when they would get hurt, they’re actually",
              "roll": null,
              "reference_page": 15
            }
          ]
        },
        {
          "id": "deadeye",
          "name": "Deadeye",
          "starter": {
            "id": "death-from-afar",
            "name": "Death from AfaR",
            "hint": "When you enter a combat situation, gain Aim equal to your DEX (min 1). You can spend 1 Aim to do one of the maneuvers below. When the combat situation ends, lose all Aim. •Line It Up — Your next ranged attack gains #piercing and…",
            "roll": null,
            "reference_page": 15
          },
          "moves": [
            {
              "id": "find-weakness",
              "name": "Find Weakness",
              "hint": "You may Sense Motive+DEX by observing them in a battle or physical contest. If you do so, no matter the roll you may also ask one question about their strengths and",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "sniper-nest",
              "name": "Sniper Nest",
              "hint": "When you spend minutes or hours (GM’s call) finding or creating the perfect vantage point, you gain the following benefits while there: • Once a combat situation begins, gain +1 Aim (max 4) • The first time you attack with a ranged…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "spotter",
              "name": "Spotter",
              "hint": "When you receive Aid while attacking with a ranged weapon, instead of gaining adv on a roll you may execute one maneuver without spending",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "trick-arrows",
              "name": "Trick Arrows",
              "hint": "You may spend Aim or mark a use of the appropriate item to do any of the following maneuvers on your next ranged attack: •adventuring gear — #forceful or pulls you to them or vice-versa •alchemical vials — +1 dmg and spreads acid,…",
              "roll": null,
              "reference_page": 15
            }
          ]
        },
        {
          "id": "scout",
          "name": "Scout",
          "starter": {
            "id": "lay-of-the-land",
            "name": "Lay of the Land",
            "hint": "When you survey an environment or landscape away from your companions, roll+INT, then skip ahead to when you return to your companions. ✴On a 10+, choose three benefits below. ✴On a 7-9, only two. ✴On a 6-, choose one, but something…",
            "roll": "INT",
            "reference_page": 15
          },
          "moves": [
            {
              "id": "hunter-s-mark",
              "name": "Hunter’s Mark",
              "hint": "Once per session, when you focus on hunting an individual, gain the following benefits when interacting with them until the end of that session: • Gain adv on Moves rolled in direct pursuit of them • When you Spout Lore about them,…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "peerless-wayfarer",
              "name": "Peerless Wayfarer",
              "hint": "When you use Lay of the Land, if you spend excessive time exploring (days or weeks), make an extra choice. No matter the time spent, ✴on a 12+, you also bring back a lead on an ally, opportunity, or treasure. Say which, then the GM…",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "the-wild-provides",
              "name": "The Wild Provides",
              "hint": "When you search a natural landscape for resources, Defy Danger+INT. ✴On a 7+, gain 2 Uses, split between adventuring gear, medicine, and",
              "roll": null,
              "reference_page": 15
            },
            {
              "id": "natural-historian",
              "name": "Natural Historian",
              "hint": "When you Spout Lore about flora or fauna from the wild, ✴on a 7+, ask an additional question. If it can fight, the GM will also tell you its HP and",
              "roll": null,
              "reference_page": 15
            }
          ]
        }
      ]
    },
    "Rogue": {
      "name": "Rogue",
      "hp": 8,
      "startingMove": "Tricks of the Trade",
      "startingDescription": "Apply Roguish Skills: use 1d8+1d6 instead of 2d6 when the move applies.",
      "statsRule": {
        "locked": {
          "DEX": 2
        },
        "choose": [
          "WIS",
          "CHA"
        ],
        "chosen": 1,
        "remaining": [
          1,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Collapsible shortbow",
            "1d6 #ammo #close #near #precise #two-handed"
          ],
          [
            "Hidden daggers",
            "1d4 #ammo #concealed #hand #close #light #piercing #precise; damage advantage"
          ],
          [
            "Reliable whip",
            "1d4 #close #near #precise"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Alchemical vials (3 uses)",
          "Leather armor (1 armor, STR+1)",
          "Provisions (3 uses)",
          "Thieves’ tools (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "assassin",
          "name": "Assassin",
          "starter": {
            "id": "dirty-deeds",
            "name": "Dirty Deeds",
            "hint": "Add • employ/cure poison and • identify weakness to your Roguish Skills. If you don’t have the Tricks of the Trade Rogue Starting Move, you gain it, but only with these two Skills. If you already had any of these Roguish Skills, work…",
            "roll": null,
            "reference_page": 17
          },
          "moves": [
            {
              "id": "always-a-way-out",
              "name": "Always a Way Out",
              "hint": "When you’re in too deep and look for a way out, roll+DEX. ✴On a 10+, you and your allies are gone. ✴On a 7-9, you need to leave something behind; the GM will say what. ✴On a 6-, it was a trick or a trap; mark 1 XP and the GM makes a…",
              "roll": "DEX",
              "reference_page": 17
            },
            {
              "id": "backstab",
              "name": "Backstab",
              "hint": "When you ambush a surprised or defenseless opponent with a #precise weapon, you may roll dmg as normal, or may instead roll+DEX. ✴On a 10+, choose two below. ✴On a 7-9, only one: •Reduce their armor dmg reduction by 1 until it’s…",
              "roll": "DEX",
              "reference_page": 17
            },
            {
              "id": "poisoncraft",
              "name": "Poisoncraft",
              "hint": "You get adv to Defy Danger against poison, and you get a poisoner’s kit OOO uses. Mark to produce a poison on the spot; state its effect, then choose two from the following: • it can be delivered by touch (otherwise it’s ingestion) •…",
              "roll": null,
              "reference_page": 17
            },
            {
              "id": "stalker-in-shadows",
              "name": "Stalker in Shadows",
              "hint": "Add • hide in shadows to your Roguish Skills. If you already have it, instead work with the GM to create a new Roguish Skill. When you Sneak Past with a Roguish Skill, roll with 1d10+1d6 (instead of 1d8+1d6). When you look for a…",
              "roll": null,
              "reference_page": 17
            }
          ]
        },
        {
          "id": "burglar",
          "name": "Burglar",
          "starter": {
            "id": "expert-treasure-hunter",
            "name": "Expert Treasure-hunter",
            "hint": "Add • climb walls and • fit into tight spaces to your Roguish Skills. If you don’t have the Tricks of the Trade Rogue Starting Move, you gain it, but only with these two Skills. If you already had any of these Roguish Skills, work…",
            "roll": null,
            "reference_page": 17
          },
          "moves": [
            {
              "id": "better-lucky-than-good",
              "name": "Better Lucky Than Good",
              "hint": "When you take this Move you get Luck equal to your wis (min 1). Once per scene, you can spend 1 Luck to reroll any die rolled by you or that directly affects you (such as the dmg roll of an enemy attacking you). When you Enjoy…",
              "roll": null,
              "reference_page": 17
            },
            {
              "id": "breaking-entering",
              "name": "Breaking & Entering",
              "hint": "When​ ​you​ ​set your mind​ ​to​ ​steal​ ​something, name​ ​the​ ​thing​ ​and​ ​ ask​ ​the​ ​GM​ questions equal to your wis (min 1) and they will answer truthfully.​ When you acquire it, you and everyone who helped each clear a…",
              "roll": null,
              "reference_page": 17
            },
            {
              "id": "quick-on-the-draw",
              "name": "Quick on the Draw",
              "hint": "When the GM or another Player is about to make a Move, with their permission (out of character) you can mark a Condition to interrupt it and act immediately",
              "roll": null,
              "reference_page": 17
            },
            {
              "id": "vanishing-act",
              "name": "Vanishing Act",
              "hint": "When you are sure no one is paying attention directly to you, you can disappear from a Scene entirely, not rejoining the narrative until the Scene ends. If you’re in trouble or a bind, ask the GM what you must do to disappear and they…",
              "roll": null,
              "reference_page": 17
            }
          ]
        },
        {
          "id": "spy",
          "name": "Spy",
          "starter": {
            "id": "the-one-for-the-job",
            "name": "The One for the Job",
            "hint": "Add • forge documents and • understand languages to your Roguish Skills. If you don’t have the Tricks of the Trade Rogue Starting Move, you gain it, but only with these two Skills. For each Skill that is redundant, work with the GM to…",
            "roll": null,
            "reference_page": 17
          },
          "moves": [
            {
              "id": "hand-trick",
              "name": "Hand Trick",
              "hint": "When you leave a room or other location, you can name something small that you saw that no one else was using or paying particular attention to. You took it with",
              "roll": null,
              "reference_page": 17
            },
            {
              "id": "maven-saboteur",
              "name": "Maven Saboteur",
              "hint": "When you reveal that you’ve used a disguise to previously sabotage or nullify an obstacle or mechanism, right as it becomes relevant, roll+CHA. ✴On a 10+, it goes off with a bang, creating the perfect opportunity. ✴On a 7–9, the…",
              "roll": "CHA",
              "reference_page": 17
            },
            {
              "id": "underworld-connections",
              "name": "Underworld Connections",
              "hint": "When you put the word out that you’re looking for something, roll+CHA. No matter what, someone brings you a lead. ✴On a 10+, choose one complication below. ✴On a 7-9+, choose two: •It’s not quite right; the GM will say how after you…",
              "roll": "CHA",
              "reference_page": 17
            },
            {
              "id": "you-know-my-name",
              "name": "You Know My Name",
              "hint": "When you first meet someone who’s heard of you (your call), roll+CHA. ✴On a 10+, tell the GM two things they’ve heard about you. ✴On a 7-9, tell the GM one thing, and the GM tells you the other. ✴On a 6-, they don’t like what they’ve…",
              "roll": "CHA",
              "reference_page": 17
            }
          ]
        }
      ]
    },
    "Wizard": {
      "name": "Wizard",
      "hp": 6,
      "startingMove": "Weave the Arcane",
      "startingDescription": "Prepare three schools; combine their verbs and substances to cast spells using +INT.",
      "statsRule": {
        "locked": {
          "INT": 2
        },
        "choose": [
          "DEX",
          "CHA"
        ],
        "chosen": 1,
        "remaining": [
          1,
          0,
          -1
        ]
      },
      "equipment": {
        "weapons": [
          [
            "Bejeweled skull cap",
            "Arcane focus; +1 armor"
          ],
          [
            "Delicate grimoire",
            "Arcane focus; once/session instant school preparation"
          ],
          [
            "Unwieldy staff",
            "Arcane focus; 1d6 #close #hand #two-handed"
          ]
        ],
        "items": [
          "Adventuring gear (3 uses)",
          "Bag of books (3 uses)",
          "Dagger (1d4 #ammo #hand #close #piercing #precise)",
          "Potion of healing (1 use)",
          "Provisions (3 uses)"
        ]
      },
      "paths": [
        {
          "id": "evoker",
          "name": "Evoker",
          "starter": {
            "id": "evocation-magic",
            "name": "Evocation Magic",
            "hint": "Gain the Weave the Arcane Wizard Starting Move, though you only have access to Evocation (substance: elemental energies; verbs: lesser sculpt; minor channel). If you already have this Move, instead add the verbs detonate and magnify…",
            "roll": null,
            "reference_page": 19
          },
          "moves": [
            {
              "id": "contingency",
              "name": "Contingency",
              "hint": "Mark 1-3 Conditions then choose a spell or a Move that you have access to that you could reasonably prepare in advance. Also, define a specific circumstance. When the circumstance occurs, roll+Conditions marked; use the result to…",
              "roll": "CONDITIONS",
              "reference_page": 19
            },
            {
              "id": "elemental-cloak",
              "name": "Elemental Cloak",
              "hint": "Mark 1-3 Conditions to evoke a cloak made of one of the following elements. Replace X with the amount of Conditions marked: •cascading flames — Up to X opponents who inflict dmg to you suffer Xd6 dmg •icy garments — Up to X opponents…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "instant-fireball",
              "name": "Instant Fireball!",
              "hint": "Mark 1-3 Conditions, then a #near target and everyone #close to them suffers Xd6 dmg #piercing, where X is the amount of Conditions",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "power-weapon",
              "name": "Power Weapon",
              "hint": "When you shape an elemental energy in the form of a weapon, mark 1-3 Conditions and roll+Conditions marked. ✴On a 10+, choose two of the following tags. ✴On a 7-9, only one: #close #piercing. ✴On a 6-, the element breaks free; mark 1…",
              "roll": "CONDITIONS",
              "reference_page": 19
            }
          ]
        },
        {
          "id": "illusionist",
          "name": "Illusionist",
          "starter": {
            "id": "illusion-magic",
            "name": "Illusion Magic",
            "hint": "Gain the Weave the Arcane Wizard Starting Move, though you only have access to Illusion (substance: sights and/or sounds; verbs: cloak; disguise). If you already have this Move, instead add the verbs make permanent and substantiate to…",
            "roll": null,
            "reference_page": 19
          },
          "moves": [
            {
              "id": "alter-perception",
              "name": "Alter Perception",
              "hint": "When you touch someone or something, you can alter one of their perceptible aspects without Casting a Spell; mark a Condition if they are unwilling. For example, you can change someone’s perceived ancestry, outfit, or accent, or you…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "mirror-image",
              "name": "Mirror Image",
              "hint": "When you would suffer damage, you may spend mark a Condition to reveal that you were an illusion; prevent all dmg; say where #near you actually",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "the-mirror-stares-back",
              "name": "The Mirror Stares Back",
              "hint": "The first time each NPC falls for one of your illusions, you may ask them one question as if you Sensed Motive. When you Cast a Spell to make an illusory copy of a person, you can also mark a Condition to overcharge the spell. If you…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "fool-me-once",
              "name": "Fool Me Once…",
              "hint": "When you trick someone with an illusion, the next time you Pull Strings on them you have adv and may roll+INT (instead of +CHA), even if they learn it was an illusion. You can share these benefits with other PCs that were part of the…",
              "roll": "INT",
              "reference_page": 19
            }
          ]
        },
        {
          "id": "necromancer",
          "name": "Necromancer",
          "starter": {
            "id": "necromantic-magic",
            "name": "Necromantic Magic",
            "hint": "Gain the Weave the Arcane Wizard Starting Move, though you only have access to Necromancy (substance: unlife; verbs: briefly bestow; radiate). If you already have this Move, instead add the verbs corrupt and drain to the Necromancy…",
            "roll": null,
            "reference_page": 19
          },
          "moves": [
            {
              "id": "a-ghost-at-the-feast",
              "name": "A Ghost at the Feast",
              "hint": "When you kill a living creature with a spell, instead of creating something from their corpse, you can create a ghost, shade, or shadow from their soul (1 HP, inflicts 2 dmg #piercing | #invisible #immaterial). If you mark a…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "lifeforce-is-a-resource",
              "name": "Lifeforce Is a Resource",
              "hint": "When you Cast a Spell, ✴on a 7-9 you can instead choose this: •it drains your lifeforce; take 1 dmg #piercing When you attune yourself to the ethereal shackles that bind your undead to your will, you may mark a Condition, then…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "sanctum-to-unlife",
              "name": "Sanctum to Unlife",
              "hint": "When you set your mind to imbue a location with unholy power, treat it as Perform a Ritual, but you can sacrifice one living person or two of your own undead to negate each requirement— except for the last one. After you succeed, for…",
              "roll": null,
              "reference_page": 19
            },
            {
              "id": "shed-this-mortal-coil",
              "name": "Shed this Mortal Coil",
              "hint": "You’ve learned the secrets of lichdom. Gain a Phylactery (see",
              "roll": null,
              "reference_page": 19
            }
          ]
        }
      ]
    }
  },
  "CORE_MOVES": [
    {
      "name": "Aid a PC",
      "roll": "NONE",
      "hint": "Help another PC: they receive advantage, and you accept a chosen cost or risk."
    },
    {
      "name": "Cast a Spell",
      "roll": "CHOICE",
      "hint": "Describe an accessible magical effect; the GM sets its Magnitude and you roll with your casting stat."
    },
    {
      "name": "Comfort or Support",
      "roll": "NONE",
      "hint": "Support a fellow PC once per session; relevant answers can clear Conditions or increase Relationship Depth."
    },
    {
      "name": "Defy Danger",
      "roll": "CHOICE",
      "hint": "Face a threat and roll the stat most appropriate to your approach."
    },
    {
      "name": "Pull Strings",
      "roll": "CHA",
      "hint": "Persuade, deceive, or threaten an NPC; roll +CHA."
    },
    {
      "name": "Sense Motive",
      "roll": "WIS",
      "hint": "Study someone during a conversation; roll +WIS and ask questions."
    },
    {
      "name": "Sneak Past",
      "roll": "DEX",
      "hint": "Avoid detection through stealth; roll +DEX."
    },
    {
      "name": "Spout Lore",
      "roll": "QUESTIONS",
      "hint": "Recall relevant lore; answer the three knowledge questions and roll +1 for each yes."
    },
    {
      "name": "Trade Blows",
      "roll": "STR",
      "hint": "Exchange attacks: use +STR for melee or +DEX for ranged / #precise weapons."
    },
    {
      "name": "Unearth Secrets",
      "roll": "INT",
      "hint": "Investigate a mysterious place or situation; roll +INT and discover something."
    },
    {
      "name": "End the Session",
      "roll": "NONE",
      "hint": "Answer three group questions; gain 1 XP per yes. Use the session settlement button to apply XP."
    },
    {
      "name": "Face Death",
      "roll": "NONE",
      "hint": "At 0 HP, choose to gamble (roll with +0) or make a final heroic sacrifice."
    },
    {
      "name": "Level Up",
      "roll": "NONE",
      "hint": "At 5 XP, gain a level, +1 HP, and one eligible advancement."
    },
    {
      "name": "Make Camp",
      "roll": "NONE",
      "hint": "Once per session, rest for several hours, recover full HP, and clear one marked Condition."
    },
    {
      "name": "Perform a Ritual",
      "roll": "NONE",
      "hint": "Use a magical font to achieve an extraordinary effect by fulfilling GM requirements."
    },
    {
      "name": "Reach Your Limit",
      "roll": "NONE",
      "hint": "When your final Condition is marked, clear marked Conditions and lock one after an outburst."
    },
    {
      "name": "Undertake a Perilous Journey",
      "roll": "TRAVEL",
      "hint": "Roll using pace: quickly −1, regularly +1, slowly +2; follow journey consequences."
    },
    {
      "name": "Enjoy Downtime",
      "roll": "NONE",
      "hint": "In safety, rest, train, resupply, shop, and address locked Conditions using Treasure."
    },
    {
      "name": "Forge a Bond",
      "roll": "NONE",
      "hint": "When two PCs reach mutual 3 Depth, forge a new or improve an existing Bond."
    },
    {
      "name": "Reveal Your Struggle",
      "roll": "NONE",
      "hint": "Reveal or deepen a Struggle after a qualifying camp or advancement."
    }
  ],
  "NR_COREDATA": {
    "Trade Blows": {
      "roll": "CHOICE",
      "trigger": "When you engage a foe in a back-and-forth exchange.",
      "hit": "10+: choose max damage, min damage received, or an ally opportunity.",
      "mixed": "7–9: suffer a Condition, give enemy an opening, or lose/break something.",
      "miss": "6−: inflict min damage OR suffer max damage and GM makes a Move.",
      "tip": "Damage is exchanged after choices. Use STR in melee; DEX at range or with #precise."
    },
    "Defy Danger": {
      "roll": "CHOICE",
      "trigger": "When facing a clear threat without a more specific Move.",
      "hit": "10+: overcome the danger cleanly.",
      "mixed": "7–9: mark a Condition, attract/escalate danger, or sacrifice something.",
      "miss": "6−: trouble; GM makes a Move."
    },
    "Cast a Spell": {
      "roll": "CHOICE",
      "trigger": "When invoking available magic; GM determines MAG before the roll.",
      "hit": "10+: effect occurs.",
      "mixed": "7–9: effect occurs but mark Condition, accept a complication, or use class-specific cost.",
      "miss": "6−: complication; GM Move.",
      "tip": "MAG below casting stat normal; equal disadvantage; above cannot cast normally."
    },
    "Pull Strings": {
      "roll": "CHA",
      "trigger": "Persuade, deceive, or threaten an NPC.",
      "hit": "10+: they comply as best they can.",
      "mixed": "7–9: compliance with a GM complication.",
      "miss": "6−: influence backfires."
    },
    "Sense Motive": {
      "roll": "WIS",
      "trigger": "Read a person closely during conversation.",
      "hit": "10+: two truthful questions.",
      "mixed": "7–9: one truthful question.",
      "miss": "6−: GM moves."
    },
    "Sneak Past": {
      "roll": "DEX",
      "trigger": "Try to avoid notice using stealth.",
      "hit": "10+: evade undetected.",
      "mixed": "7–9: evade with a complication.",
      "miss": "6−: detected or worse."
    },
    "Spout Lore": {
      "roll": "QUESTIONS",
      "trigger": "Attempt to recall relevant lore and answer three yes/no knowledge prompts.",
      "hit": "10+: useful significant information.",
      "mixed": "7–9: partial/relevant information.",
      "miss": "6−: GM complication."
    },
    "Unearth Secrets": {
      "roll": "INT",
      "trigger": "Investigate a mysterious location or situation.",
      "hit": "10+: important clear discovery.",
      "mixed": "7–9: a discovery with limitations.",
      "miss": "6−: discover something but GM complicates it."
    },
    "Undertake a Perilous Journey": {
      "roll": "TRAVEL",
      "trigger": "Travel through a hostile region with a destination and pace.",
      "hit": "10+: reach destination with boon.",
      "mixed": "7–9: arrive with pursuit, obstacle, or an opportunity.",
      "miss": "6−: danger surprises the group; each marks XP."
    },
    "Face Death": {
      "roll": "NONE",
      "trigger": "At zero HP you are Helpless. Further damage can kill you.",
      "hit": "Gamble with Death: 10+ recover half max HP.",
      "mixed": "Gamble: 7–9 suffer a lasting loss or die after action.",
      "miss": "Gamble: 6− die before scene ends. Or choose a final heroic deed."
    },
    "Make Camp": {
      "roll": "NONE",
      "trigger": "Once per session spend hours resting; the GM advances dangers.",
      "hit": "Recover all HP; clear one marked (not locked) Condition.",
      "mixed": "Only explicitly camp-recharging resources refill.",
      "miss": ""
    },
    "End the Session": {
      "roll": "NONE",
      "trigger": "Party discusses three growth questions.",
      "hit": "All PCs gain 1 XP per group yes.",
      "mixed": "Mark 5 XP to advance.",
      "miss": ""
    },
    "Enjoy Downtime": {
      "roll": "NONE",
      "trigger": "Spend days in a secure location.",
      "hit": "Carouse, resupply, shop, or train using Treasure.",
      "mixed": "Resupply restores nonmagical item uses at a Treasure cost.",
      "miss": ""
    },
    "Reach Your Limit": {
      "roll": "NONE",
      "trigger": "All five Conditions are marked/locked.",
      "hit": "Clear marked Conditions and lock one linked to an outburst.",
      "mixed": "Locked Conditions require special recovery.",
      "miss": ""
    },
    "Level Up": {
      "roll": "NONE",
      "trigger": "At 5 XP.",
      "hit": "Clear XP; gain level, +1 HP (up to +10), and one legal Advancement.",
      "mixed": "You can defer the advancement choice.",
      "miss": ""
    }
  },
  "NR_GM_GUIDE": {
    "Flow": "Describe the scene → ask what the PCs do → determine whether a Move triggers → resolve its outcomes → describe the changed fiction.",
    "NPCs": "Give NPCs a name, description, drive, resources, and resistances. Add HP, armor, and damage only if they fight. Significant NPCs gain escalation Conditions.",
    "NPC scaling": "Group fighting: 3 HP / d4. Small group: 6 HP / d6. Solitary: 12 HP / d8. Larger bodies gain HP and larger damage dice. Armor from 0 flesh to 4 magical.",
    "Enemies": "PCs trigger the Moves; the GM usually only rolls NPC damage. No turn-by-turn initiative requirement. Resistances depend on the fiction.",
    "Conditions": "The five PC Conditions are Angry, Distracted, Exhausted, Frightened, Insecure. Marked ones can clear normally; locked ones demand special removal.",
    "Damage": "Armor reduces incoming damage to minimum 1; #piercing bypasses armor. Shields normally have a use to negate one attack and recharge after camp.",
    "MAG": "MAG 0 minor magic; 1 standard; 2 major; 3 high. Compare to casting stat before rolling: lower=normal, equal=disadvantage, higher=unavailable.",
    "Wealth": "Track Treasure through Wealth tiers: Broke(4), Poor(6), Modest(8), Comfortable(10), Rich(12), Aristocratic. Purchases cost no Treasure below your tier, one tick at your tier, unaffordable above.",
    "Scenes": "No rigid rounds required. Advance scenes when narrative context shifts; reset only resources that explicitly refresh each scene.",
    "Threats": "A Threat has a Goal, sequence of Developments, and optional secrets/scenes. When time passes, tick forward if fiction supports the escalation.",
    "Safety": "Agree on lines and veils, use pause/check-in signals, respect a player leaving or requesting a scene rewind; record only boundaries participants agree to share.",
    "Spells": "Wizard combines verbs and substances from currently prepared schools. A name or spellbook entry does not by itself establish MAG or grant mechanical effects."
  },
  "NR_CATALOG": [
    {
      "id": "starter:Barbarian:Ancestral longsword",
      "name": "Ancestral longsword",
      "category": "Starting weapon/focus",
      "class": "Barbarian",
      "kind": "Weapon",
      "description": "1d6 #close; shield (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close"
      ]
    },
    {
      "id": "starter:Barbarian:Bloodstained greataxe",
      "name": "Bloodstained greataxe",
      "category": "Starting weapon/focus",
      "class": "Barbarian",
      "kind": "Weapon",
      "description": "1d8 #close #two-handed #forceful",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d8",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#two-handed",
        "#forceful"
      ]
    },
    {
      "id": "starter:Barbarian:Dual hammers",
      "name": "Dual hammers",
      "category": "Starting weapon/focus",
      "class": "Barbarian",
      "kind": "Weapon",
      "description": "1d6 #close #light; damage advantage",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#light"
      ]
    },
    {
      "id": "starter:Barbarian:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Barbarian",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Barbarian:Hearty feast",
      "name": "Hearty feast",
      "category": "Starting equipment",
      "class": "Barbarian",
      "kind": "Consumable",
      "description": "Hearty feast (1 use)",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Barbarian:Potion of healing",
      "name": "Potion of healing",
      "category": "Starting equipment",
      "class": "Barbarian",
      "kind": "Consumable",
      "description": "Restores half maximum HP (rounded down) OR clears a locked Condition.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Barbarian:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Barbarian",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Barbarian:Trap kit",
      "name": "Trap kit",
      "category": "Starting equipment",
      "class": "Barbarian",
      "kind": "Consumable",
      "description": "Trap kit (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Bard:Noble’s crossbow",
      "name": "Noble’s crossbow",
      "category": "Starting weapon/focus",
      "class": "Bard",
      "kind": "Weapon",
      "description": "1d8 #ammo #near #far #precise #piercing #reload #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d8",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#near",
        "#far",
        "#precise",
        "#piercing",
        "#reload",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Bard:Sword cane",
      "name": "Sword cane",
      "category": "Starting weapon/focus",
      "class": "Bard",
      "kind": "Weapon",
      "description": "1d6 #concealed #hand #precise #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#concealed",
        "#hand",
        "#precise",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Bard:Decorated longsword",
      "name": "Decorated longsword",
      "category": "Starting weapon/focus",
      "class": "Bard",
      "kind": "Weapon",
      "description": "1d6 #hand; buckler (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand"
      ]
    },
    {
      "id": "starter:Bard:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Bard",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Bard:Artistic samples",
      "name": "Artistic samples",
      "category": "Starting equipment",
      "class": "Bard",
      "kind": "Consumable",
      "description": "Artistic samples (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Bard:Bag of books",
      "name": "Bag of books",
      "category": "Starting equipment",
      "class": "Bard",
      "kind": "Consumable",
      "description": "Bag of books (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Bard:Fine delicacies",
      "name": "Fine delicacies",
      "category": "Starting equipment",
      "class": "Bard",
      "kind": "Consumable",
      "description": "Fine delicacies (1 use)",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Bard:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Bard",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Cleric:Consecrated mace",
      "name": "Consecrated mace",
      "category": "Starting weapon/focus",
      "class": "Cleric",
      "kind": "Weapon",
      "description": "1d6 #hand; shield (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand"
      ]
    },
    {
      "id": "starter:Cleric:Plain quarterstaff",
      "name": "Plain quarterstaff",
      "category": "Starting weapon/focus",
      "class": "Cleric",
      "kind": "Weapon",
      "description": "1d6 #close #hand #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#hand",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Cleric:Reinforced net",
      "name": "Reinforced net",
      "category": "Starting weapon/focus",
      "class": "Cleric",
      "kind": "Weapon",
      "description": "0 #close #hand; trap (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#hand"
      ]
    },
    {
      "id": "starter:Cleric:Holy water vials",
      "name": "Holy water vials",
      "category": "Starting equipment",
      "class": "Cleric",
      "kind": "Consumable",
      "description": "Holy water vials (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Cleric:Leather armor (1 armor, STR+1)",
      "name": "Leather armor (1 armor, STR+1)",
      "category": "Starting equipment",
      "class": "Cleric",
      "kind": "Item",
      "description": "Leather armor (1 armor, STR+1)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Cleric:Medicine",
      "name": "Medicine",
      "category": "Starting equipment",
      "class": "Cleric",
      "kind": "Consumable",
      "description": "Medicine (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Cleric:Potion of healing",
      "name": "Potion of healing",
      "category": "Starting equipment",
      "class": "Cleric",
      "kind": "Consumable",
      "description": "Restores half maximum HP (rounded down) OR clears a locked Condition.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Cleric:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Cleric",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Druid:Flowering staff",
      "name": "Flowering staff",
      "category": "Starting weapon/focus",
      "class": "Druid",
      "kind": "Weapon",
      "description": "1d4 #close #two-handed (2 uses)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d4",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Druid:Vine slingshot",
      "name": "Vine slingshot",
      "category": "Starting weapon/focus",
      "class": "Druid",
      "kind": "Weapon",
      "description": "1d6 #near #ammo #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#near",
        "#ammo",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Druid:Wooden club",
      "name": "Wooden club",
      "category": "Starting weapon/focus",
      "class": "Druid",
      "kind": "Weapon",
      "description": "1d6 #close; shield (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close"
      ]
    },
    {
      "id": "starter:Druid:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Druid",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Druid:Alchemical vials",
      "name": "Alchemical vials",
      "category": "Starting equipment",
      "class": "Druid",
      "kind": "Consumable",
      "description": "Alchemical vials (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Druid:Medicine",
      "name": "Medicine",
      "category": "Starting equipment",
      "class": "Druid",
      "kind": "Consumable",
      "description": "Medicine (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Druid:Potion of healing",
      "name": "Potion of healing",
      "category": "Starting equipment",
      "class": "Druid",
      "kind": "Consumable",
      "description": "Restores half maximum HP (rounded down) OR clears a locked Condition.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Druid:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Druid",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Intimidating greataxe",
      "name": "Intimidating greataxe",
      "category": "Starting weapon/focus",
      "class": "Fighter",
      "kind": "Weapon",
      "description": "1d8 #hand #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d8",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Fighter:Twin shortswords",
      "name": "Twin shortswords",
      "category": "Starting weapon/focus",
      "class": "Fighter",
      "kind": "Weapon",
      "description": "1d6 #hand #light #precise; damage advantage",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand",
        "#light",
        "#precise"
      ]
    },
    {
      "id": "starter:Fighter:Yew longbow",
      "name": "Yew longbow",
      "category": "Starting weapon/focus",
      "class": "Fighter",
      "kind": "Weapon",
      "description": "1d6 #ammo #near #far #reload #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#near",
        "#far",
        "#reload",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Fighter:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Breastplate (2 armor, STR+2)",
      "name": "Breastplate (2 armor, STR+2)",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Item",
      "description": "Breastplate (2 armor, STR+2)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Studded leather (1 armor, STR+1)",
      "name": "Studded leather (1 armor, STR+1)",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Item",
      "description": "Studded leather (1 armor, STR+1)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Medicine",
      "name": "Medicine",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Consumable",
      "description": "Medicine (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Fighter:Shield",
      "name": "Shield",
      "category": "Starting equipment",
      "class": "Fighter",
      "kind": "Consumable",
      "description": "Shield (1 use)",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "camp",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Paladin:Bloodied warhammer",
      "name": "Bloodied warhammer",
      "category": "Starting weapon/focus",
      "class": "Paladin",
      "kind": "Weapon",
      "description": "1d8 #close #two-handed #forceful",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d8",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#two-handed",
        "#forceful"
      ]
    },
    {
      "id": "starter:Paladin:Silver-bolt crossbow",
      "name": "Silver-bolt crossbow",
      "category": "Starting weapon/focus",
      "class": "Paladin",
      "kind": "Weapon",
      "description": "1d8 #ammo #near #far #reload #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d8",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#near",
        "#far",
        "#reload",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Paladin:Liege’s longsword",
      "name": "Liege’s longsword",
      "category": "Starting weapon/focus",
      "class": "Paladin",
      "kind": "Weapon",
      "description": "1d6 #close; shield (1 use)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close"
      ]
    },
    {
      "id": "starter:Paladin:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Paladin",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Paladin:Half plate (2 armor, STR+2)",
      "name": "Half plate (2 armor, STR+2)",
      "category": "Starting equipment",
      "class": "Paladin",
      "kind": "Item",
      "description": "Half plate (2 armor, STR+2)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Paladin:Javelins (1d4 #ammo #near #thrown)",
      "name": "Javelins (1d4 #ammo #near #thrown)",
      "category": "Starting equipment",
      "class": "Paladin",
      "kind": "Item",
      "description": "Javelins (1d4 #ammo #near #thrown)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#near",
        "#thrown"
      ]
    },
    {
      "id": "starter:Paladin:Potion of healing",
      "name": "Potion of healing",
      "category": "Starting equipment",
      "class": "Paladin",
      "kind": "Consumable",
      "description": "Restores half maximum HP (rounded down) OR clears a locked Condition.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Paladin:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Paladin",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Ranger:Composite bow",
      "name": "Composite bow",
      "category": "Starting weapon/focus",
      "class": "Ranger",
      "kind": "Weapon",
      "description": "1d6 #near #far #ammo #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#near",
        "#far",
        "#ammo",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Ranger:Dual scimitars",
      "name": "Dual scimitars",
      "category": "Starting weapon/focus",
      "class": "Ranger",
      "kind": "Weapon",
      "description": "1d6 #hand #light #precise; damage advantage",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand",
        "#light",
        "#precise"
      ]
    },
    {
      "id": "starter:Ranger:Staff and sling",
      "name": "Staff and sling",
      "category": "Starting weapon/focus",
      "class": "Ranger",
      "kind": "Weapon",
      "description": "1d6 #hand #close; sling 1d4 #near #ammo",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#hand",
        "#close",
        "#near",
        "#ammo"
      ]
    },
    {
      "id": "starter:Ranger:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Ranger",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Ranger:Light armor (1 armor, STR+1)",
      "name": "Light armor (1 armor, STR+1)",
      "category": "Starting equipment",
      "class": "Ranger",
      "kind": "Item",
      "description": "Light armor (1 armor, STR+1)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Ranger:Medicine",
      "name": "Medicine",
      "category": "Starting equipment",
      "class": "Ranger",
      "kind": "Consumable",
      "description": "Medicine (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Ranger:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Ranger",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Ranger:Trap kit",
      "name": "Trap kit",
      "category": "Starting equipment",
      "class": "Ranger",
      "kind": "Consumable",
      "description": "Trap kit (2 uses)",
      "source": "Beta v3 example",
      "uses": 2,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Rogue:Collapsible shortbow",
      "name": "Collapsible shortbow",
      "category": "Starting weapon/focus",
      "class": "Rogue",
      "kind": "Weapon",
      "description": "1d6 #ammo #close #near #precise #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#close",
        "#near",
        "#precise",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Rogue:Hidden daggers",
      "name": "Hidden daggers",
      "category": "Starting weapon/focus",
      "class": "Rogue",
      "kind": "Weapon",
      "description": "1d4 #ammo #concealed #hand #close #light #piercing #precise; damage advantage",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d4",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#concealed",
        "#hand",
        "#close",
        "#light",
        "#piercing",
        "#precise"
      ]
    },
    {
      "id": "starter:Rogue:Reliable whip",
      "name": "Reliable whip",
      "category": "Starting weapon/focus",
      "class": "Rogue",
      "kind": "Weapon",
      "description": "1d4 #close #near #precise",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d4",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#near",
        "#precise"
      ]
    },
    {
      "id": "starter:Rogue:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Rogue",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Rogue:Alchemical vials",
      "name": "Alchemical vials",
      "category": "Starting equipment",
      "class": "Rogue",
      "kind": "Consumable",
      "description": "Alchemical vials (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Rogue:Leather armor (1 armor, STR+1)",
      "name": "Leather armor (1 armor, STR+1)",
      "category": "Starting equipment",
      "class": "Rogue",
      "kind": "Item",
      "description": "Leather armor (1 armor, STR+1)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Rogue:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Rogue",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Rogue:Thieves’ tools",
      "name": "Thieves’ tools",
      "category": "Starting equipment",
      "class": "Rogue",
      "kind": "Consumable",
      "description": "Thieves’ tools (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Bejeweled skull cap",
      "name": "Bejeweled skull cap",
      "category": "Starting weapon/focus",
      "class": "Wizard",
      "kind": "Focus",
      "description": "Arcane focus; +1 armor",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 1,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Delicate grimoire",
      "name": "Delicate grimoire",
      "category": "Starting weapon/focus",
      "class": "Wizard",
      "kind": "Focus",
      "description": "Arcane focus; once/session instant school preparation",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Unwieldy staff",
      "name": "Unwieldy staff",
      "category": "Starting weapon/focus",
      "class": "Wizard",
      "kind": "Focus",
      "description": "Arcane focus; 1d6 #close #hand #two-handed",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "1d6",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#close",
        "#hand",
        "#two-handed"
      ]
    },
    {
      "id": "starter:Wizard:Adventuring gear",
      "name": "Adventuring gear",
      "category": "Starting equipment",
      "class": "Wizard",
      "kind": "Consumable",
      "description": "Adventuring gear (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Bag of books",
      "name": "Bag of books",
      "category": "Starting equipment",
      "class": "Wizard",
      "kind": "Consumable",
      "description": "Bag of books (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Dagger (1d4 #ammo #hand #close #piercing #precise)",
      "name": "Dagger (1d4 #ammo #hand #close #piercing #precise)",
      "category": "Starting equipment",
      "class": "Wizard",
      "kind": "Item",
      "description": "Dagger (1d4 #ammo #hand #close #piercing #precise)",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": [
        "#ammo",
        "#hand",
        "#close",
        "#piercing",
        "#precise"
      ]
    },
    {
      "id": "starter:Wizard:Potion of healing",
      "name": "Potion of healing",
      "category": "Starting equipment",
      "class": "Wizard",
      "kind": "Consumable",
      "description": "Restores half maximum HP (rounded down) OR clears a locked Condition.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "starter:Wizard:Provisions",
      "name": "Provisions",
      "category": "Starting equipment",
      "class": "Wizard",
      "kind": "Consumable",
      "description": "Provisions (3 uses)",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "magic:adamantine armor",
      "name": "Adamantine Armor",
      "category": "Magic item",
      "class": "",
      "kind": "Armor",
      "description": "Medium/heavy armor that makes maximum-damage outcomes less severe; requires GM damage adjudication.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:alchemy jug",
      "name": "Alchemy Jug",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Produces one chosen mundane liquid by speaking a command; output and daily limitations follow the GM ruling.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:animated rope",
      "name": "Animated Rope",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Command a magical rope to perform simple tasks; the rope follows ordinary physical limits.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:animated shield",
      "name": "Animated Shield",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Floating shield with a limited special defense use; distinguish it from ordinary armor.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "camp",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:armor of vulnerability",
      "name": "Armor Of Vulnerability",
      "category": "Magic item",
      "class": "",
      "kind": "Armor",
      "description": "Cursed protective armor with a chosen damage-type vulnerability; track its danger as well as defense.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#cursed"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:arrow of _______ slaying",
      "name": "Arrow Of _______ Slaying",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Special projectile particularly effective against one named kind of creature.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#piercing"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:arrows of acheron",
      "name": "Arrows Of Acheron",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Limited magical shots that ignore visual concealment and darkness.",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:bag of holding",
      "name": "Bag Of Holding",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Unusually large internal carrying capacity without proportional weight.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:barb of the Black Gate",
      "name": "Barb Of The Black Gate",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Inserted into a corpse to interfere with restoration or return from death.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:bead of force",
      "name": "Bead Of Force",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Expended bead creates a short-lived force effect that can trap or displace creatures.",
      "source": "Beta v3 example",
      "uses": 8,
      "reset": "never",
      "effects": [],
      "tags": [
        "#near",
        "#close"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:berserker axe",
      "name": "Berserker Axe",
      "category": "Magic item",
      "class": "",
      "kind": "Weapon",
      "description": "Cursed battleaxe whose violent magic can compel the wielder.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#cursed"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:dancing sword",
      "name": "Dancing Sword",
      "category": "Magic item",
      "class": "",
      "kind": "Weapon",
      "description": "Sword capable of acting independently for limited intervals.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#near"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:dust of disappearance",
      "name": "Dust Of Disappearance",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Consumable dust that hides targets from sight for a limited time.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [
        "#close"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:dust of dryness",
      "name": "Dust Of Dryness",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Absorbs water into a small bead; can release it again under the right circumstances.",
      "source": "Beta v3 example",
      "uses": 10,
      "reset": "never",
      "effects": [],
      "tags": [
        "#piercing",
        "#piercing"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:dust of sneezing and choking",
      "name": "Dust Of Sneezing And Choking",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Cursed dust that interferes with breathing and action.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [
        "#cursed",
        "#close",
        "#piercing",
        "#piercing"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:earworm wax",
      "name": "Earworm Wax",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Use magical wax to plant a thought or persistent phrase in a listener.",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:efficient quiver",
      "name": "Efficient Quiver",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Removes the ammunition limitation from qualifying carried ranged weapons.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "passive",
          "duration": "equipped",
          "value": "no-ammo"
        }
      ],
      "tags": [
        "#ammo"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:elemental gem",
      "name": "Elemental Gem",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Break the gem to release its stored elemental force; single-use.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#consumable"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:eversmoking bottle",
      "name": "Eversmoking Bottle",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Create a persistent cloud of smoke until the bottle is closed.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#near",
        "#far"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:forget-me-naught",
      "name": "Forget-Me-Naught",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Alchemical dose that changes or suppresses memories; GM-defined consequences.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:helm of comprehending languages",
      "name": "Helm Of Comprehending Languages",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Magically understand unfamiliar spoken or written languages.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:horn of blasting",
      "name": "Horn Of Blasting",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Unleash a damaging shockwave; track use and possible magical backlash.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#near",
        "#piercing"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:immovable rod",
      "name": "Immovable Rod",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Locks itself in space against ordinary forces until released.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:magic wand",
      "name": "Magic Wand",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Channel a specialized magical effect; its exact power is set when obtained.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:marvelous pigments",
      "name": "Marvelous Pigments",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Paint an object or feature and make it physically real within stated limits.",
      "source": "Beta v3 example",
      "uses": 4,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:mithral armor",
      "name": "Mithral Armor",
      "category": "Magic item",
      "class": "",
      "kind": "Armor",
      "description": "Unusually light armor that reduces the normal burden of its protection.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "passive",
          "duration": "equipped",
          "value": "lightweight-armor"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:oil of slipperiness",
      "name": "Oil Of Slipperiness",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Applied oil creates extraordinary slipperiness or freedom from restraints.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [
        "#close"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:philter of love",
      "name": "Philter Of Love",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Temporary charm or infatuation after drinking.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:phylactery",
      "name": "Phylactery",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Necromancer-only soul anchor used to return after death; vulnerable to destruction.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [
        "#hidden",
        "#warded"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:portable hole",
      "name": "Portable Hole",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Portable opening into a large extradimensional space.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of animal friendship",
      "name": "Potion Of Animal Friendship",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Temporarily become able to influence a beast.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of clairvoyance",
      "name": "Potion Of Clairvoyance",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "See or hear events at a distance for a limited duration.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of climbing",
      "name": "Potion Of Climbing",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Climb almost any surface at normal movement speed for a scene.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "activate",
          "duration": "scene",
          "value": "climbing"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of diminution",
      "name": "Potion Of Diminution",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Reduce physical size substantially for a scene.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of flying",
      "name": "Potion Of Flying",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Fly and hover for a scene at normal movement speed.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "activate",
          "duration": "scene",
          "value": "flying"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of gaseous form",
      "name": "Potion Of Gaseous Form",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Become mistlike, changing how you move and what can harm you.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "activate",
          "duration": "scene",
          "value": "gaseous"
        }
      ],
      "tags": [
        "#incorporeal"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of growth",
      "name": "Potion Of Growth",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Increase size and mass for a limited duration.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of healing",
      "name": "Potion Of Healing",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Recover half of missing HP, rounded down, or clear a locked Condition (magic-item example).",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "heal_missing_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of heroism",
      "name": "Potion Of Heroism",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Gain a small bonus die to the next Move and damage roll.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "bonus_die",
          "scope": "activate",
          "duration": "next-roll",
          "value": "1d4"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of invisibility",
      "name": "Potion Of Invisibility",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Become invisible temporarily, generally ending on hostile or magical action.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "activate",
          "duration": "scene",
          "value": "invisible"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of poison",
      "name": "Potion Of Poison",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Cursed liquid that imitates beneficial potion appearances.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [
        "#cursed",
        "#piercing",
        "#piercing",
        "#poisoned"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of ____________ resistance",
      "name": "Potion Of ____________ Resistance",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Give incoming damage of the named type disadvantage while the effect lasts.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of speed",
      "name": "Potion Of Speed",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Move at twice ordinary speed and gain protective armor briefly.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "armor_bonus",
          "scope": "activate",
          "duration": "scene",
          "value": 1
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:potion of water breathing",
      "name": "Potion Of Water Breathing",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Breathe underwater for a scene.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "activate",
          "duration": "scene",
          "value": "water-breathing"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:restorative ointment",
      "name": "Restorative Ointment",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Limited salve doses that restore health or remove specific ailments.",
      "source": "Beta v3 example",
      "uses": 5,
      "reset": "never",
      "effects": [],
      "tags": [
        "#poisoned"
      ],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:ring of warmth",
      "name": "Ring Of Warmth",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Protect against cold environments and related hazards.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [
        {
          "type": "tag",
          "scope": "passive",
          "duration": "equipped",
          "value": "cold-protected"
        }
      ],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:sending stones",
      "name": "Sending Stones",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Linked pair of magical communicators; contact is restricted by item rules.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:sovereign glue",
      "name": "Sovereign Glue",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Permanently bond two surfaces; requires its special solvent to remove.",
      "source": "Beta v3 example",
      "uses": 7,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:spell scroll (minor)",
      "name": "Spell Scroll (Minor)",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Single-use written spell allowing a small magical effect.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:staff of the adder",
      "name": "Staff Of The Adder",
      "category": "Magic item",
      "class": "",
      "kind": "Weapon",
      "description": "Magical staff that can manifest a venomous living serpent.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:sword of life stealing",
      "name": "Sword Of Life Stealing",
      "category": "Magic item",
      "class": "",
      "kind": "Weapon",
      "description": "Blade that drains life energy under particular combat circumstances.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:tears of Annalise",
      "name": "Tears Of Annalise",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Paired stones with a sympathetic supernatural connection.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:trident of fish command",
      "name": "Trident Of Fish Command",
      "category": "Magic item",
      "class": "",
      "kind": "Magic item",
      "description": "Limited magic to issue commands to aquatic creatures.",
      "source": "Beta v3 example",
      "uses": 3,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:universal solvent",
      "name": "Universal Solvent",
      "category": "Magic item",
      "class": "",
      "kind": "Consumable",
      "description": "Dissolve magical adhesives, including sovereign glue.",
      "source": "Beta v3 example",
      "uses": 1,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "magic:vicious weapon",
      "name": "Vicious Weapon",
      "category": "Magic item",
      "class": "",
      "kind": "Weapon",
      "description": "Especially dangerous blade that deals additional damage on very strong attack results.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "never",
      "effects": [],
      "tags": [],
      "damage": "",
      "armor": 0,
      "strength": 0
    },
    {
      "id": "artifact:Alveric’s Soulstealer Blade",
      "name": "Alveric’s Soulstealer Blade",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Artifact blade that accumulates captive souls; its trapped-soul track affects future powers.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "artifact:Caliburnus, The Sword That Heals",
      "name": "Caliburnus, The Sword That Heals",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Artifact weapon whose healing has a cumulative Ruin track.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "artifact:Elleovene’s Circlet of Supreme Mesmerism",
      "name": "Elleovene’s Circlet of Supreme Mesmerism",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Magical circlet able to compel minds; its Stone Heart track escalates costs.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "artifact:Indelible Mark of Drakon",
      "name": "Indelible Mark of Drakon",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Draconic mark that grants power while spreading scales over time.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "artifact:Gwendolen’s Branch of the Green",
      "name": "Gwendolen’s Branch of the Green",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Nature artifact that develops transformative growth effects.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "artifact:Lazurite Dragon Orb",
      "name": "Lazurite Dragon Orb",
      "category": "Artifact",
      "class": "",
      "kind": "Artifact",
      "description": "Dragon-themed focus with a growing Mastery track.",
      "source": "Beta v3 example",
      "uses": 0,
      "reset": "manual",
      "effects": [],
      "track": {
        "name": "Artifact track",
        "max": 5
      },
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    },
    {
      "id": "base:weapon",
      "name": "Medium sword",
      "category": "Basic equipment",
      "kind": "Weapon",
      "description": "Ordinary one-handed blade; damage 1d6 #close",
      "damage": "1d6",
      "tags": [
        "#close"
      ],
      "uses": 0,
      "armor": 0,
      "strength": 0,
      "reset": "never",
      "effects": []
    },
    {
      "id": "base:shield",
      "name": "Shield",
      "category": "Basic equipment",
      "kind": "Shield",
      "description": "Mark its use to ignore damage from one attack; recharges at camp.",
      "uses": 1,
      "reset": "camp",
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": [],
      "effects": []
    },
    {
      "id": "base:light-armor",
      "name": "Light armor",
      "category": "Basic equipment",
      "kind": "Armor",
      "armor": 1,
      "strength": 1,
      "description": "Reduces damage received by 1 to a minimum of 1; needs STR+1.",
      "uses": 0,
      "damage": "",
      "tags": [],
      "reset": "never",
      "effects": []
    },
    {
      "id": "base:medium-armor",
      "name": "Medium armor",
      "category": "Basic equipment",
      "kind": "Armor",
      "armor": 2,
      "strength": 2,
      "description": "Reduces damage by 2 to a minimum of 1; needs STR+2.",
      "uses": 0,
      "damage": "",
      "tags": [],
      "reset": "never",
      "effects": []
    },
    {
      "id": "base:heavy-armor",
      "name": "Heavy armor",
      "category": "Basic equipment",
      "kind": "Armor",
      "armor": 3,
      "strength": 3,
      "description": "Reduces damage by 3 to a minimum of 1; needs STR+3.",
      "uses": 0,
      "damage": "",
      "tags": [],
      "reset": "never",
      "effects": []
    },
    {
      "id": "base:healing",
      "name": "Potion of healing (starting)",
      "category": "Basic equipment",
      "kind": "Consumable",
      "description": "Restore half of maximum HP (rounded down) OR clear one locked Condition.",
      "effects": [
        {
          "type": "heal_max_half",
          "scope": "activate",
          "duration": "instant",
          "value": 0
        }
      ],
      "uses": 1,
      "reset": "never",
      "damage": "",
      "armor": 0,
      "strength": 0,
      "tags": []
    }
  ],
  "NR_GM_MOVES": [
    "Show an unwelcome truth",
    "Reveal approaching danger",
    "Use a creature or location move",
    "Inflict harm or impose a Condition",
    "Separate them",
    "Put someone in a difficult position",
    "Show the costs of their choice",
    "Take away or exhaust a resource",
    "Offer a risky opportunity",
    "Escalate an existing threat",
    "Reveal a faction response",
    "Advance a threat development",
    "Introduce a new obstacle",
    "Ask what happens next"
  ]
};
