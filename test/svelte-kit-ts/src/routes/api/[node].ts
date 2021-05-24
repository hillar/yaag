/**
 * @type {import('@sveltejs/kit').RequestHandler}
 */

 interface Node {
	 id: string | number
	 size?: number
	 color?: number
	 actions?: string[]
	 data?: any
 }

 interface Result {
	 body: Node | null

 }

let counter = 0

 export async function get(req): Result {
        counter ++
		const {params, query} = req
		const {node} = params
		return {
			body: {
				node: {id:Math.random(),data:{label: node + ' ' + counter}}
			}
		};
	
}