const supabase = require('../config/supabase');

async function uploadImage(imageFile, bucket, imageName) {
    const { data, error } = await supabase.storage.from(bucket).upload(imageName, imageFile.buffer, {
        cacheControl: '3600',
        upsert: true
    });
    if (error) {
        throw new Error('Failed to upload image to Supabase: ' + error.message);
    }
    return data.path;
}

async function deleteImage(bucket, imagePath) {
    const { data, error } = await supabase.storage.from(bucket).remove([imagePath]);
    if (error) {
        throw new Error('Failed to upload image to Supabase: ' + error.message);
    }
}

module.exports = {
    uploadImage,
    deleteImage
};
