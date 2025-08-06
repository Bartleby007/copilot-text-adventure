const output = document.getElementById('game-output');
const input = document.getElementById('game-input');
const actionsContainer = document.getElementById('game-actions');

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
      look: () => 'The hallway is dimly lit. The window is closed.',
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
  output.innerHTML = `<div class="desc">${scenes[gameState.location].description}</div>`;
  actionsContainer.innerHTML = '';
  const actions = scenes[gameState.location].actions;
  Object.keys(actions).forEach(action => {
    const btn = document.createElement('button');
    btn.textContent = prettifyAction(action);
    btn.className = 'action-btn';
    btn.onclick = () => handleAction(action);
    actionsContainer.appendChild(btn);
  });
  output.scrollTop = output.scrollHeight;
}

function prettifyAction(action) {
  if (action === 'look') return 'Look Around';
  if (action === 'inventory') return 'Check Inventory';
  // Capitalize first letter for movement and other actions
  return action.charAt(0).toUpperCase() + action.slice(1);
}

function handleAction(command) {
  input.value = '';
  output.innerHTML += `<div class="cmd">&gt; ${command}</div>`;
  const actions = scenes[gameState.location].actions;
  let response = actions[command] ? actions[command]() : "I don't understand that.";
  output.innerHTML += `<div class="resp">${response}</div>`;
  render();
}

function handleInput(e) {
  if (e.key === 'Enter') {
    const command = input.value.trim().toLowerCase();
    if (!command) return;
    handleAction(command);
  }
}

input.addEventListener('keydown', handleInput);
window.onload = render;