function renderItem(index, selected) {
    let item
    switch (index) {
      case 1: item = { value: selected.nigerianStock, title: 'Nigerian Stock', symbol: 'NS' };
        break;
      case 2: item = { value: selected.foriengnStock, title: 'Foriengn Stock', symbol: 'FS' };
        break;
      case 3: item = { value: selected.techStock, title: 'Tech Stock', symbol: 'TS' };
        break;
      case 4: item = { value: selected.emergingStock, title: 'Emerging Stock', symbol: 'ES' };
        break;
      case 5: item = { value: selected.nigerianBond, title: 'Nigerian Bond', symbol: 'NB' };
        break;
      case 6: item = { value: selected.foriengnBond, title: 'Foriengn Bond', symbol: 'FB' };
        break;
      case 7: item = { value: selected.commodity, title: 'Commodity', symbol: 'CO' };
        break;
      case 8: item = { value: selected.realEstate, title: 'Real Estate', symbol: 'RE' };
        break;
      case 9: item = { value: selected.tbills, title: 'Tbills', symbol: 'Tbi' };
        break;
      default: item = { value: selected.alternative, title: 'Alternative', symbol: 'Alt' };
    }
    return { value: parseInt(item.value) * 2, title: item.title, symbol: item.symbol }
  
  }

  export default renderItem;