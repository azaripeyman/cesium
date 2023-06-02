import { test, expect } from "@playwright/test";
import executeCesiumCode from "./executeCesiumCode.js";

/* global Cesium */

test("CesiumWidget renders", async ({ page }) => {
  await executeCesiumCode(page, async () => {
    const widget = new Cesium.CesiumWidget("cesiumContainer");
    widget.clock.currentTime = Cesium.JulianDate.fromIso8601("2013-12-25");
  });

  await expect(page).toHaveScreenshot();
});

test("Viewer renders", async ({ page }) => {
  await executeCesiumCode(page, () => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      timeline: false, // timeline does not render deterministically
    });
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2013-12-25");
  });
  await expect(page).toHaveScreenshot();
});

test("loads animated model", async ({ page }) => {
  await executeCesiumCode(page, async () => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      timeline: false, // timeline does not render deterministically
    });
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2013-12-25");

    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      5000.0
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );

    const entity = viewer.entities.add({
      position: position,
      orientation: orientation,
      model: {
        uri: "../../Apps/SampleData/models/CesiumAir/Cesium_Air.glb",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });

    viewer.trackedEntity = entity;
  });

  await expect(page).toHaveScreenshot();
});

test("loads draco model", async ({ page }) => {
  await executeCesiumCode(page, async () => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      timeline: false, // timeline does not render deterministically
    });
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2013-12-25");

    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      0.0
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );

    const entity = viewer.entities.add({
      position: position,
      orientation: orientation,
      model: {
        uri:
          "../../Apps/SampleData/models/DracoCompressed/CesiumMilkTruck.gltf",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });

    viewer.trackedEntity = entity;
  });

  await expect(page).toHaveScreenshot();
});

test("loads model with KTX2 textures", async ({ page }) => {
  await executeCesiumCode(page, async () => {
    const viewer = new Cesium.Viewer("cesiumContainer", {
      infoBox: false,
      selectionIndicator: false,
      shadows: true,
      timeline: false, // timeline does not render deterministically
    });
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2013-12-25");

    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      1000.0
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr
    );

    const entity = viewer.entities.add({
      position: position,
      orientation: orientation,
      model: {
        uri:
          "../../Apps/SampleData/models/CesiumBalloonKTX2/CesiumBalloonKTX2.glb",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });

    viewer.trackedEntity = entity;
  });

  await expect(page).toHaveScreenshot();
});
