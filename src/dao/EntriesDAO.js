import DB from './DB.js';
import 'regenerator-runtime/runtime';

class EntriesDAO {
  constructor() {
    this.db = new DB();
  }

  async getAllEntries() {
    const sql = 'SELECT * FROM entries ORDER BY date desc';
    const rows = await this.db.query(sql);
    return rows;
  }

  async createEntry(date, value) {
    const sql = 'INSERT INTO entries (date, value) VALUES (?, ?)';
    const result = await this.db.query(sql, [date, value]);
    return result.affectedRows;
  }

  async getEntryByDate(date) {
    const sql = 'SELECT * FROM entries WHERE date = ?';
    const rows = await this.db.query(sql, [date]);
    return rows[0];
  }

  async updateEntry(date, value) {
    const sql = 'UPDATE entries SET value = ? WHERE date = ?';
    const result = await this.db.query(sql, [value, date]);
    return result.affectedRows > 0;
  }

  async deleteEntry(date) {
    const sql = 'DELETE FROM entries WHERE date = ?';
    const result = await this.db.query(sql, [date]);
    return result.affectedRows > 0;
  }
}

export default EntriesDAO;
