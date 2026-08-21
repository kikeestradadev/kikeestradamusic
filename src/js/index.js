import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import featuredVideos from './modules/featuredVideos';
import reviews from './modules/reviews';
import gallery from './modules/gallery';
import floatingButton from './modules/floatingButton';
import reveal from './modules/reveal';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	featuredVideos();
	reviews();
	gallery();
	floatingButton();
	reveal();
};

document.addEventListener('DOMContentLoaded', initComponents);
