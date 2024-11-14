import { useRef, useMemo } from 'react';
// import { useRoute } from '@react-navigation/native';
import track, { trackType } from './track';

type TrackParams = { page_name: string; [any: string]: string };

/**
 * 埋点hooks
 */
const useAnalytics = () => {
  // const route = useRoute();

  const pageRef = useRef({
    page_name: '',
  });

  const analytics = useMemo(() => {
    const getCommon = () => ({
      page_name: pageRef.current.page_name,
    });

    const resultTrack: trackType = {
      pageShow: (page_name: string | TrackParams) => {
        const params: TrackParams = typeof page_name === 'object' ? page_name : { page_name };
        pageRef.current.page_name = params.page_name;

        track.pageShow(params);
      },
      modShow: (params: object) => {
        track.modShow({
          ...getCommon(),
          ...params,
        });
      },
      modClick: (params: object) => {
        track.modClick({
          ...getCommon(),
          ...params,
        });
      },
      buttonShow: (params: object) => {
        track.buttonShow({
          ...getCommon(),
          ...params,
        });
      },
      buttonClick: (params: object) => {
        track.buttonClick({
          ...getCommon(),
          ...params,
        });
      },
    };

    return { track: resultTrack };
  }, []);

  return analytics;
};

export default useAnalytics;
