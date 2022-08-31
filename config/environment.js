const development = {
    name: 'development',
    asset_path: './public/assets',
    session_cookie_key: 'almncuejkncpdbjr',
    db: 'issue_tracker_development'
}

const production = {
    name: 'production',
    asset_path: process.env.techlab_asset_path,
    session_cookie_key: process.env.techlab_session_cookie_key,
    db: process.env.techlab_db,
    mongodb_url: process.env.techlab_mongodb_url
}

module.exports = eval(process.env.techlab_environment == undefined? development : eval(process.env.techlab_environment));