renderExchangePairSelection() {
  return (
    <View style={styles1.modalContainer}>
      <View style={styles1.row3}>
        <Text>Please select exchange pair</Text>
        <TouchableOpacity onPress={() => {

        }}>
          <Text style={{color: 'red'}}>Done</Text>
        </TouchableOpacity>
      </View>
      <View style={styles1.row4}>
        <Swiper
          ref='swiper'
          loadMinimal loadMinimalSize={1}
          loop={false}
          showButtons={true}
          height={270}
          showsPagination={true}
        >
          <ScrollView>
            <View style={styles1.row5}>
              <TouchableOpacity style={styles1.item} onPress={() => {
                this.setState({
                  showExchangePairSelection: false
                })
                this.props.setExchangePair('ETHBTC')
              }}>
                <Text>ETHBTC</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView>
            <View style={styles1.row5}>
              <TouchableOpacity style={styles1.item} onPress={() => {
                this.setState({
                  showExchangePairSelection: false
                })
              }}>
                <Text>BTCETH</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <ScrollView>
            <View style={styles1.row5}>
              <TouchableOpacity style={styles1.item} onPress={() => {
                this.setState({
                  showExchangePairSelection: false
                })
              }}>
                <Text>BTCUSD</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Swiper>
      </View>
    </View>
  )
}
