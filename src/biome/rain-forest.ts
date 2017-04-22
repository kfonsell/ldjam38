
import { Biome } from './biome';
import { Output } from '../terminal/output';

export class RainForest implements Biome {
    public name: string = 'rain-forest';
    public type: string = 'Rain Forest';
    public description: string = 'These trees are really big the sun is hiding behind leafs. Humidity is way high for my integrated circuits. No I’m not a complaining robots.';

    private searched: boolean = false;
    private searchedCount: number = 0;

    public search(output: Output) {
        this.searched = true;
        this.searchedCount++;

        if (this.searchedCount == 1) {
            output.writeToTerminal("Like a feeling of being observed by some beasts. Did you hear that ?");
            output.displayToMonitor('scenes/01');
        }
        if (this.searchedCount == 2) {
            output.writeToTerminal("More details");
        }
        if (this.searchedCount > 2) {
            output.writeToTerminal("Full details");
        }
    }
}
