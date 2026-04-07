export async function taoBoNapMoHinh(renderer) {
  const [
    { GLTFLoader },
    { DRACOLoader },
    { KTX2Loader },
    { MeshoptDecoder },
  ] = await Promise.all([
    import('three/examples/jsm/loaders/GLTFLoader.js'),
    import('three/examples/jsm/loaders/DRACOLoader.js'),
    import('three/examples/jsm/loaders/KTX2Loader.js'),
    import('three/examples/jsm/libs/meshopt_decoder.module.js'),
  ])

  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')

  const ktx2Loader = new KTX2Loader()
  ktx2Loader.setTranscoderPath('/basis/')
  ktx2Loader.detectSupport(renderer)

  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)
  gltfLoader.setKTX2Loader(ktx2Loader)
  gltfLoader.setMeshoptDecoder(MeshoptDecoder)

  return {
    gltfLoader,
    dracoLoader,
    ktx2Loader,
    MeshoptDecoder,
  }
}
