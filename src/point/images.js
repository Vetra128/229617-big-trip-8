export const getImages = (images) => `${images.map((picture)=>`
      <img src="http:${picture}" alt="picture from place" class="point__destination-image">`).join(``)}`;
