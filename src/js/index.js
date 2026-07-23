import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import mediaGallery from './modules/mediaGallery';
import floatingButton from './modules/floatingButton';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	mediaGallery();
	floatingButton();
};

document.addEventListener('DOMContentLoaded', initComponents);
