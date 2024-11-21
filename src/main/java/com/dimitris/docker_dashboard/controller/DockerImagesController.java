package com.dimitris.docker_dashboard.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dimitris.docker_dashboard.service.DockerService;
import com.github.dockerjava.api.model.Image;

@RestController
@RequestMapping("api/images")
public class DockerImagesController {
  private final DockerService dockerService;

  public DockerImagesController(DockerService dockerService) {
    this.dockerService = dockerService;
  }

  @GetMapping("")
  public List<Image> listImages() {
    return dockerService.listImages();
  }

  @GetMapping("/filter")
  public List<Image> listImages(@RequestParam(required = true, defaultValue = "image-") String filterName) {
    return dockerService.filterImages(filterName);
  }
}
