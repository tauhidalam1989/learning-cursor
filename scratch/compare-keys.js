const fs = require('fs');

const content = fs.readFileSync('app/admin/page.tsx', 'utf8');

// Extract the initial serviceForm object fields
const stateStart = content.indexOf('const [serviceForm, setServiceForm] = useState({');
const stateEnd = content.indexOf('  });', stateStart);
const stateBlock = content.substring(stateStart, stateEnd);
const stateKeys = stateBlock.match(/^\s*([a-zA-Z0-9_]+):/gm).map(k => k.trim().replace(':', ''));

// Extract the edit serviceForm setter object fields
const editStart = content.indexOf('setServiceForm({', content.indexOf('setEditingId(s.id);'));
const editEnd = content.indexOf('});', editStart);
const editBlock = content.substring(editStart, editEnd);
const editKeys = editBlock.match(/^\s*([a-zA-Z0-9_]+):/gm).map(k => k.trim().replace(':', ''));

console.log('State Keys count:', stateKeys.length);
console.log('Edit Keys count:', editKeys.length);

const onlyInState = stateKeys.filter(k => !editKeys.includes(k));
const onlyInEdit = editKeys.filter(k => !stateKeys.includes(k));

console.log('Only in state:', onlyInState);
console.log('Only in edit:', onlyInEdit);
