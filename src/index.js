const { Transformer } = require("@parcel/plugin");
const { transform } = require("sucrase");

module.exports = new Transformer({
    async parse({asset}) {
        console.log(asset);
        //TODO Parse file type and add to transforms?
        return {transforms: ["jsx", "typescript", "flow",  "imports", "react-hot-loader", "jest"]}; // All available transforms from Sucrase
    },

    async transform({asset}) {
        let options = this.parse({asset});
        return transform(await asset.getCode(), options);
    },

    async generate({asset}){
        const compiled = await this.transform({asset});
        return { code: compiled.code, map: compiled.sourceMap };
    }
});

