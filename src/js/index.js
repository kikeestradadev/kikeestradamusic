import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import featuredVideos from './modules/featuredVideos';
import thumbsGallery from './modules/thumbsGallery';
import produce from './modules/produce';
import reviews from './modules/reviews';
import floatingButton from './modules/floatingButton';
import reveal from './modules/reveal';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	featuredVideos();
	thumbsGallery();
	produce();
	reviews();
	floatingButton();
	reveal();
};

document.addEventListener('DOMContentLoaded', initComponents);
