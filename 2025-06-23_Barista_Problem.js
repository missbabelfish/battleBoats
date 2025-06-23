/* Given a list of the times you need to brew each coffee, return the minimum total waiting time.
If you get it right, you will get that raise your boss promised you! 

@@params - times needed to brew
@@returns - minimum total waiting time of all brews
@@pseudo -
sort array ascending
init pointer
init sum
while pointer < length
sum += slice(pointer)
return sum + 2*(length - 1) */

const barista = coffees => {
	if (!coffees.length) return 0;
	const sorted = coffees.sort((a, b) => a - b);
	let pointer = 1;
	let sum = 0;
	while (pointer <= sorted.length) {
		sum += sorted.slice(0, pointer).reduce((acc, cur) => acc + cur, 0);
        sum += 2 * (pointer-1)
		pointer++;
	}
	return sum;
};