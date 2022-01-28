export const server_url = '192.168.100.62' // il iei din expo
export const server_port = '2027'
export const nameDB = 'dosareDB3'
// ------------------------------------------------
// ---- MANAGEMENT SECTION
export const createTableCommand = 'CREATE TABLE IF NOT EXISTS dosare (id INTEGER PRIMARY KEY, nume TEXT, medie1 INTEGER, medie2 INTEGER, status BOOLEAN)'
export const addToDatabaseCommand = "INSERT INTO dosare VALUES (?,?,?,?,?)"
export const createCRUDTableCommand = 'CREATE TABLE IF NOT EXISTS crud (crudId INTEGER PRIMARY KEY AUTOINCREMENT,  operationType TEXT, id INTEGER, nume TEXT, medie1 INTEGER, medie2 INTEGER, status BOOLEAN)'
export const addToCRUDDatabaseCommand = "INSERT INTO crud VALUES (?,?,?,?,?,?,?)" // cu 2 x ? in plus, pentru operation si pentru ID

export const readAllCommand = 'SELECT * FROM dosare'
export const dropTableCommand = 'DROP TABLE dosare'

export const deleteCommand = 'DELETE FROM dosare WHERE id=?'


export const mapEntityToList = (entity) =>[
    entity.id,
    entity.nume,
    entity.medie1,
    entity.medie2,
    entity.status,]

export const addElementPath = '/register'      // (1.a)
export const getAllElementsPath = '/all' // (1.b)
export const deleteElementPath = '/space'   // (1.c)
// cand intra doi clienti - unul face add => ii apare si celuilalt ce o adaugat primul
export const solveServerUpdateMessage = (entity) => (`Nume: ${entity.nume}, Medie1: ${entity.medie1}, Medie2: ${entity.medie2}, Status: ${entity.status}`)

//----------------------------------
// --- USERS SECTION
export const filteredPath = '/level/1' // (2.b)
export const findElementPath = '/rule' // (2.c)
export const orderFunction = (elements) => {  // (2.a)
    return elements.sort((a,b) => {
        var a_medie = 0.75 * a.medie1 + 0.25 * a.medie2
        var b_medie = 0.75 * b.medie1 + 0.25 * b.medie2
        if (Number(a_medie) > Number(b_medie)) {return -1}
        if (Number(a_medie) < Number(b_medie)) {return 1}

        if (Number(a.medie1) > Number(b.medie1)) {return -1}
        if (Number(a.medie1) < Number(b.medie1)) {return 1}

        if (Number(a.medie2) > Number(b.medie2)) {return -1}
        if (Number(a.medie2) < Number(b.medie2)) {return 1}

        return 0
    })
}
export const filterFunction = (elements) =>{
    return elements.filter((a)=>{
        if(a.status == true) return true
        return false
    })
}
export const filterFunction1 = (elements) =>{
    return elements.filter((a)=>{
        if(a.status == false) return true
        return false
    })
}
export const updatePath = '/validate'
export const updateSuccessMessage = 'Successfully updated parking space status'
export const updateFieldsPath = '/validate' //(1.d)
//-----------------------------------
//------- STATS


