import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';

const initComponents = () => {
	coreModule();
	internalModule();
};

document.addEventListener('DOMContentLoaded', initComponents);
