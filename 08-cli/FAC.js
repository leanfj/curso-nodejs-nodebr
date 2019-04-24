class FAC {
  constructor({ fac, categoria }) {
    this.facNumber = fac ? parseInt(fac) : undefined;
    this.category = categoria ? parseInt(categoria) : undefined;
  }
}

module.exports = FAC;
