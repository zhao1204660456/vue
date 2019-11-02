module.exports={
    devServer: {
        proxy: {
            '/index': {
                target: 'http://www.fruit.com',
                ws: true,
                changeOrigin: true
            }
        }
    }
};