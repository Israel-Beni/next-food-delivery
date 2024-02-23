import type { Schema, Attribute } from '@strapi/strapi';

export interface RestaurantRestaurant extends Schema.Component {
  collectionName: 'components_restaurant_restaurants';
  info: {
    displayName: 'restaurant';
  };
  attributes: {};
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'restaurant.restaurant': RestaurantRestaurant;
    }
  }
}
