const output = document.getElementById('game-output');
const input = document.getElementById('game-input');

const gameState = {
  location: 'start',
  inventory: [],
};

const scenes = {
  start: {
    description: 'You are in a small room. There is a door to the north.',
    actions: {
      'go north': () => {
        gameState.location = 'hallway';
        return 'You walk through the door into a long hallway.';
      },
      look: () => 'There is a wooden door to the north. The room is bare.',
      inventory: showInventory
    }
  },
  hallway: {
    description: 'You are in a long hallway. There is a window at the end.',
    actions: {
      'look': () => 'The hallway is dimly lit. The window is closed.',
      'go south': () => {
        gameState.location = 'start';
        return 'You return to the small room.';
      },
      'open window': () => 'The window is stuck shut.',
      inventory: showInventory
    }
  }
};

function showInventory() {
  if (gameState.inventory.length === 0) return 'You have nothing.';
  return 'You are carrying: ' + gameState.inventory.join(', ');
}

function render() {
  output.innerHTML += `<div class="desc">${scenes[gameState.location].description}</div>`;
  output.scrollTop = output.scrollHeight;
}

function handleInput(e) {
  if (e.key === 'Enter') {
    const command = input.value.trim().toLowerCase();
    input.value = '';
    output.innerHTML += `<div class="cmd">&gt; ${command}</div>`;
    const actions = scenes[gameState.location].actions;
    let response = actions[command] ? actions[command]() : "I don't understand that.";
    output.innerHTML += `<div class="resp">${response}</div>`;
    output.scrollTop = output.scrollHeight;
  }
}

input.addEventListener('keydown', handleInput);
window.onload = render;