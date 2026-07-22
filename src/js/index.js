import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
};

document.addEventListener('DOMContentLoaded', initComponents);
