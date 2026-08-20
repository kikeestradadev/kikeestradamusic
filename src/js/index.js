import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import featuredVideos from './modules/featuredVideos';
import gallery from './modules/gallery';
import floatingButton from './modules/floatingButton';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	featuredVideos();
	gallery();
	floatingButton();
};

document.addEventListener('DOMContentLoaded', initComponents);
