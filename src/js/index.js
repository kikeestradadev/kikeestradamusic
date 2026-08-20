import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import featuredVideos from './modules/featuredVideos';
import reviews from './modules/reviews';
import gallery from './modules/gallery';
import floatingButton from './modules/floatingButton';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	featuredVideos();
	reviews();
	gallery();
	floatingButton();
};

document.addEventListener('DOMContentLoaded', initComponents);
