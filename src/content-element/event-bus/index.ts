import mitt from 'mitt';

type Events = {
  
};

export const emitter = mitt<Events>();
