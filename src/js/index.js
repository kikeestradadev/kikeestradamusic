import coreModule from './modules/coreModule';
import internalModule from './modules/internalModule';
import mainMenu from './modules/mainMenu';
import gallery from './modules/gallery';
import youtubePortfolio from './modules/youtubePortfolio';

const initComponents = () => {
	coreModule();
	internalModule();
	mainMenu();
	gallery();
	youtubePortfolio();
};

document.addEventListener('DOMContentLoaded', initComponents);
