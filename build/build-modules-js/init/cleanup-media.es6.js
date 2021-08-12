const {
  stat, mkdir, copy, remove,
} = require('fs-extra');
const { join } = require('path');

const RootPath = process.cwd();

/**
 * Method that will erase the media/vendor folder
 * and populate the debugbar assets
 *
 * @returns {Promise}
 */
module.exports.cleanVendors = async () => {
  // eslint-disable-next-line no-console
  console.log('Cleanup the Vendor ');

  const mediaFolder = await stat(join(RootPath, 'libraries/vendor/maximebf/debugbar/src/DebugBar/Resources'));

  if (await mediaFolder.isDirectory()) {
    // Remove the vendor folder
    // await remove(join(RootPath, 'media'));
    // eslint-disable-next-line no-console
    // console.error('/media has been removed.');

    // Recreate the media folder
    await mkdir(join(RootPath, 'media/vendor/debugbar'), { recursive: true });

    // Copy some assets from a PHP package
    await copy(join(RootPath, 'libraries/vendor/maximebf/debugbar/src/DebugBar/Resources'), join(RootPath, 'media/vendor/debugbar'));
    await remove(join(RootPath, 'media/vendor/debugbar/vendor/font-awesome'));
    await remove(join(RootPath, 'media/vendor/debugbar/vendor/jquery'));
  } else {
    // eslint-disable-next-line no-console
    console.error('You need to run `npm install` AFTER the command `composer install`!!!. The debug plugin HASN\'T installed all its front end assets');
    process.exit(1);
  }
};
