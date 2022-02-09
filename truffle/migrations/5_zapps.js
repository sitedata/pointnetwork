const twitter = artifacts.require('./Twitter.sol');
const blog = artifacts.require('./Blog.sol');
const pointSocial = artifacts.require('./PointSocial.sol');

module.exports = function(deployer) {
    deployer.deploy(twitter);
    deployer.deploy(blog);
    deployer.deploy(pointSocial);
};
