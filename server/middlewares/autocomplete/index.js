const GoogleApi = require('../../GoogleApi');

module.exports = async (req, res) => {
  try {
    const [input, session] = req.params.request.split('&');
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&types=(cities)&offset=3&session=${session}`;

    // TODO: Maybe back this stuff from the class
    // TODO: Fix error with fast typing
    const autocompleteData = await GoogleApi.get(apiUrl).catch(e => console.error(e));

    if (autocompleteData.status === 'OK') {
      const autocompleteList = autocompleteData.predictions.map(
        ({ description, place_id: placeId }) => ({
          description,
          placeId
        })
      );
      res.json(autocompleteList);
    }
  } catch (err) {
    res.status(400).send('Something went wrong!');
  }
};
