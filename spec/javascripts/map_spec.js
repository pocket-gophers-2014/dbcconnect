returnTypeOf = function(object){
  return Object.prototype.toString.apply(object)
}

describe("NameSpace", function(){
  it("is defined", function(){
    expect(BootMap).toBeDefined()
  });
})

describe("Controller", function(){
  beforeEach(function(){
    mapStub = {}
    osmStub = {}

    $("<div id='map' style='display:none'></div>").appendTo("body");
  })

  afterEach(function() {
    $("#map").remove();
  });

  it("produces an array of coordinates", function(){
    locationArray = []
    expect(controller.getCoords()).toContain([27.5,-118.5])
  }),

  it("has a new map function", function(){
    expect(controller.newMap).toBeDefined();
  }),

  it("creates a new map object", function(){
    expect(returnTypeOf(controller.newMap())).toBe(returnTypeOf(mapStub))
  }),

  it("initializes an OpenStreetMap layer", function(){
    expect(returnTypeOf(controller.osmInitializer())).toBe(returnTypeOf(osmStub))
  })

})

describe("View", function(){
  beforeEach(function(){
    this.view = new BootMap.View(true);
    this.mapObject = true;
    this.osm = true;
  })

  it("is has a controller",function(){
    expect(this.view.controller).toBeTruthy()
  }),

  it("is undefined if called with no arguments",function(){
    expect(this.view.drawMap()).toBeUndefined()
  })

  it("requires a map and osm as parameters to draws a map", function(){
    expect(this.view.drawMap(this.mapObject,this.osm)).toBeDefined()
  })
})

