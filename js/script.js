alert('Hello and welcome to the unofficial Doom 3 text adventure remake, Please press Ok and enjoy the story!')

var heroes = [
  {
    Name: " Male Marine",
  },
  {
    Name: " Female Marine",
  },
];

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You are a marine that is sent to mars to investigate multiple incidents invloving the Delta Complex. Upon arrival Sergeant Thomas Kelly gives you your first orders, find a scientist that has gone missing from Delta Labs. After searching for some time you find him in a decomissioned Comms Facility, where he is trying to send a warning to the UAC on Earth about Betrugers teleportation experiments.  However, as he tries to explain the situation to the marine, another teleportation test takes place but loses containment, at which point the entire Mars base is swept with an unnatural shockwave causing you to drop your weapon and the forces of Hell are invading through the teleporters portal and transforming most of the bases personnel into zombies.',
    options: [
      {
        text: 'Quickly grab your weapon and run.',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Leave your weapon there is not enough time.',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'After making your way through the zombified personnel you get remote orders from kelly to link up with Bravo team and recieve a transmission card containg a distress signal for reinforcements on your way you meet an undead merchant.',
    options: [
      {
        text: 'Trade your gun for a better one',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'Trade your gun for medical supplies',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
      {
        text: 'Ignore the merchant',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'After leaving the merchant you learn that UAC board member Elliot Swann and his bodyguard Jack Campbell are still alive and are also en route to the comunications facility to prevent any messages from being sent in hopes of containing the situation on mars.',
    options: [
      {
        text: 'Rush to the Comms Facility',
        nextText: 4
      },
      {
        text: 'Set up camp in an old abonded factory',
        nextText: 5
      },
      {
        text: 'Find a cave to sleep in',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'While rushing to the facility your are overran by to many demons at once and get killed.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'Without any knowledge on the factory you are not aware that is is highly dangerous at night, during your sleep you and bravo team are killed.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You wake up well rested and full of energy ready to get to the facility.',
    options: [
      {
        text: 'Explore the facility',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'You get to the facility and you are able to find the transmission card but not before Campbell was able to destory the bulk of equipment. When you arrive back at delta labs you see an injured Swann who informs you that Kelly has been working with hell for possibly the whole time, and has been transformed by demons. Hearing this news you rush immediatley to kelly location where you find campbell there mortally wounded and only has enough strength to tell you that kelly has taken his BFG 9000, after a long battle with kelly you defeat him. You then head underground to the primary excavation site to retrieve the soul cube, down there you discover the Hellmouth defended by Hells mightiest warrior the Cyberdemon.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack it with your weapon',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Use your medical supplies to overheal.',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'Use the soul cube',
        requiredState: (currentState) => currentState.blueGoo,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run are in vain and the cyberdemon easily catches.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You foolishly thought the cyberdemon could be slain with a single weapon.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'The monster laughed as you though more medical supplies would help you and ate you.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'Using the soul cube you defeat the Cyberdemon and the soul cube seals up hellmouth.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame()