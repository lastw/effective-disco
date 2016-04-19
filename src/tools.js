export function tree(slot) {
    console.group(slot.name);
	console.log('id:', slot.id);
	console.log('props:', slot.moduleInstance._props);
	slot.children.forEach(tree);
	console.groupEnd();
};
