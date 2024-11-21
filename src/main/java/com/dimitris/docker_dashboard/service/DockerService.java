package com.dimitris.docker_dashboard.service;

import java.util.List;
import org.springframework.stereotype.Service; // Import correto
import com.github.dockerjava.api.DockerClient;
import com.github.dockerjava.api.model.Container;
import com.github.dockerjava.api.model.Image;

@Service
public class DockerService {
  private final DockerClient dockerClient;

  public DockerService(DockerClient client) {
    this.dockerClient = client;
  }

  public List<Container> listContainers(boolean all) {
    return dockerClient.listContainersCmd().withShowAll(all).exec();
  }

  public List<Image> listImages() {
    return dockerClient.listImagesCmd().exec();
  }

  public List<Image> filterImages(String filterName) {
    return dockerClient.listImagesCmd().withImageNameFilter(filterName).exec();
  }

  public void startContainer(String containerId) {
    dockerClient.startContainerCmd(containerId).exec();
  }

  public void stopContainer(String containerId) {
    dockerClient.stopContainerCmd(containerId).exec();
  }

  public void deleteContainer(String containerId) {
    dockerClient.removeContainerCmd(containerId).exec();
  }

  public void createContainer(String imageName) {
    dockerClient.createContainerCmd(imageName).exec();
  }
}
