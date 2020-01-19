require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

// GET ALL ITEMS THAT CONTAIN TEXT
function search(searchTerm) {
    knexInstance
    .select('name')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(results => {
        console.log(results)
    })
}

search("fried");

//GET ALL ITEMS PAGINATED
function paginated(pageNumber) {
    
    const offset = 6 * (pageNumber - 1);
    
    console.log(offset);
    
    knexInstance
    .select('*')
    .from('shopping_list')
    .limit(6)
    .offset(offset)
    .then(result => {
        console.log(result)
    })
}

paginated(2);

//GET ALL ITEMS ADDED AFTER DATE
function addedAfter(daysAgo) {
    
    console.log(`Items added after ${daysAgo} days ago!`);
    
    const days = daysAgo;
    
    knexInstance
    .select('*')
    .from('shopping_list')
    .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, days)
    )
    .then(result => {
        console.log(result)
    })
}

addedAfter(90);