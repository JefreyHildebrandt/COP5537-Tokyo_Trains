export class AssetManager {
    static train;
    static trainStation;

    static async loadAssets() {
        const assetPromises = [];

        assetPromises.push(AssetManager.loadSingleAsset('../../assets/train.svg', 'train'));
        assetPromises.push(AssetManager.loadSingleAsset('../../assets/train_station.svg', 'trainStation'));

        await Promise.all(assetPromises);
    }

    static loadSingleAsset(assetUrl, variable) {
        return new Promise((resolve) => {
            const assetImage = new Image();
            assetImage.src = assetUrl;
            assetImage.onload = () => {
                if(variable === 'train') {
                    AssetManager.train = assetImage;
                }
                else if(variable === 'trainStation') {
                    AssetManager.trainStation = assetImage;
                }
                else {
                    console.error('variable: ' + variable + ' not supported');
                }

                resolve();
            };
        });
    }

    getAsset(assetName) {
        return this.loadedAssets[assetName];
    }
}