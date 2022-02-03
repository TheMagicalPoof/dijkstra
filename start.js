class Vector2{
  constructor(x, y){
    this.x = x
    this.y = y
  }
  equal(vector2){
    if(this.x === vector2.x && this.y === vector2.y) return true
    return false
  }
}

class Vertex extends Vector2{
  constructor(x, y){
    super(x, y);
    this.visited = false
    this.dist = 0
    this.prev = null
  }
}

class Graph {
  constructor(matrix) {
    this.matrix = matrix
    this.vertices = []
    this.adjMatrix = []
    this.queue = []

    this.getVertices()
    this.genAdjMatrix()
  }

  getVertices(){
    for(let x=0; x < this.matrix[0].length; x++){
      for(let y=0; y < this.matrix.length; y++){
        if(this.matrix[y][x] === 1){
          this.vertices.push(new Vertex(x, y))
        }
      }
    }
  }

  genAdjMatrix(){
    for(let i=0; i < this.vertices.length; i++){
      this.adjMatrix.push([])
      for(let j=0; j < this.vertices.length; j++){
        if(this.linked(this.vertices[i], this.vertices[j])){
          this.adjMatrix[i].push(1)
        } else {
          this.adjMatrix[i].push(0)
        }
      }
    }
  }

  linked(Vert1, Vert2) {
    if(Vert1.x - 1 === Vert2.x && Vert1.y === Vert2.y) return true
    if(Vert1.x + 1 === Vert2.x && Vert1.y === Vert2.y) return true
    if(Vert1.x === Vert2.x && Vert1.y - 1 === Vert2.y) return true
    if(Vert1.x === Vert2.x && Vert1.y + 1 === Vert2.y) return true
    return false
  }

  BFS(startVertInd, finVertInd){
    this.queue.push(this.vertices[startVertInd])
    this.vertices[startVertInd].visited = true
    while(this.queue.length){
      let chekedVert = this.queue.pop()
      if(chekedVert.equal(this.vertices[finVertInd])) return true

      let nJ = this.vertices.findIndex(function (vert) {
        return vert.equal(chekedVert)
      })

      for(let nI = 0; nI < this.adjMatrix[nJ].length; nI++){
        if(this.adjMatrix[nJ][nI] === 1){
          if(!this.vertices[nI].visited){
            this.vertices[nI].visited = true
            this.vertices[nI].prev = nJ
            this.vertices[nI].dist = chekedVert.dist + 1
            this.queue.push(this.vertices[nI])
          }
        }
      }
    }
    return false
  }

  findWay(startVec2, finVec2){
    let startVertInd = this.vertices.findIndex(function (vert) {
      return vert.equal(startVec2)
    })
    let finVertInd = this.vertices.findIndex(function (vert) {
      return vert.equal(finVec2)
    })
    if(!this.BFS(startVertInd, finVertInd)) return false
    let shortPath = []
    let activeVert = this.vertices[finVertInd]
    while(!activeVert.equal(this.vertices[startVertInd])){
      shortPath.unshift(activeVert)
      activeVert = this.vertices[activeVert.prev]
    }
    shortPath.unshift(this.vertices[startVertInd])
    return shortPath
  }

  reset(){
    for(let vert of this.vertices){
      vert.visited = false
      vert.dist = 0
      vert.prev = null
    }
  }
}

let matrix = [
  [1, 0, 1],
  [1, 1, 1],
]

let test = new Graph(matrix)
console.log(test.findWay(new Vector2(0, 0), new Vector2(2, 0)))